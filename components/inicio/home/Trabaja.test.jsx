import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Trabaja from "./Trabaja";
import emailjs from "@emailjs/browser";
import { toast } from "react-hot-toast";

vi.mock("@emailjs/browser", () => ({
  default: { sendForm: vi.fn() },
}));

vi.mock("react-hot-toast", () => ({
  toast: { success: vi.fn(), error: vi.fn() },
}));

async function fillForm(user) {
  await user.type(screen.getByLabelText(/nombre y apellido/i), "Ana Pérez");
  await user.type(screen.getByLabelText(/^edad$/i), "28");
  await user.type(screen.getByLabelText(/^email$/i), "ana@example.com");
  await user.type(screen.getByLabelText(/mensaje/i), "Quiero sumarme al staff");
}

describe("Trabaja (Forma parte del Staff)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("blocks submission and shows an error when required fields are empty", async () => {
    const user = userEvent.setup();
    render(<Trabaja />);

    await user.click(screen.getByRole("button", { name: /consultar/i }));

    expect(toast.error).toHaveBeenCalledWith(
      "Por favor completa todos los campos requeridos."
    );
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });

  it("sends each field under its own name and only confirms success after EmailJS resolves", async () => {
    // Snapshot field values synchronously as EmailJS receives the form -
    // the component clears the fields right after a successful send, so
    // reading formEl.value after the fact would see the post-reset state.
    let sentValues;
    emailjs.sendForm.mockImplementationOnce(async (_service, _template, form) => {
      sentValues = {
        nombre: form.elements.namedItem("nombre")?.value,
        edad: form.elements.namedItem("edad")?.value,
        correo: form.elements.namedItem("correo")?.value,
        consulta: form.elements.namedItem("consulta")?.value,
        telefono: form.elements.namedItem("telefono"),
        mail: form.elements.namedItem("mail"),
      };
      return { status: 200, text: "OK" };
    });
    const user = userEvent.setup();
    render(<Trabaja />);

    await fillForm(user);
    expect(toast.success).not.toHaveBeenCalled();

    await user.click(screen.getByRole("button", { name: /consultar/i }));
    await waitFor(() => expect(toast.success).toHaveBeenCalled());

    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
    // Regression test for the original bug: correo/edad were sent under
    // hidden fields named "telefono"/"mail" instead of their own names.
    expect(sentValues.nombre).toBe("Ana Pérez");
    expect(sentValues.edad).toBe("28");
    expect(sentValues.correo).toBe("ana@example.com");
    expect(sentValues.consulta).toBe("Quiero sumarme al staff");
    expect(sentValues.telefono).toBeNull();
    expect(sentValues.mail).toBeNull();
  });

  it("shows an error toast and re-enables the button if EmailJS fails", async () => {
    emailjs.sendForm.mockRejectedValueOnce(new Error("network error"));
    const user = userEvent.setup();
    render(<Trabaja />);

    await fillForm(user);
    const button = screen.getByRole("button", { name: /consultar/i });
    await user.click(button);

    await waitFor(() => expect(toast.error).toHaveBeenCalled());
    expect(toast.success).not.toHaveBeenCalled();
    expect(button).not.toBeDisabled();
  });
});

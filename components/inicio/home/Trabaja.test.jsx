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

const FIELD_LABELS = {
  nombre: /nombre y apellido/i,
  edad: /^edad$/i,
  correo: /^email$/i,
  telefono: /celular \/ whatsapp/i,
  consulta: /mensaje/i,
};

const VALID_VALUES = {
  nombre: "Ana Pérez",
  edad: "28",
  correo: "ana@example.com",
  telefono: "11 2683 4248",
  consulta: "Quiero sumarme al staff",
};

async function fillForm(user, values = VALID_VALUES) {
  for (const [field, value] of Object.entries(values)) {
    await user.type(screen.getByLabelText(FIELD_LABELS[field]), value);
  }
}

describe("Trabaja (Forma parte del Staff)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each(Object.keys(VALID_VALUES))(
    "requires %s before allowing submission",
    async (missingField) => {
      const values = { ...VALID_VALUES };
      delete values[missingField];

      const user = userEvent.setup();
      render(<Trabaja />);

      await fillForm(user, values);
      await user.click(screen.getByRole("button", { name: /consultar/i }));

      expect(toast.error).toHaveBeenCalledWith(
        "Por favor completa todos los campos requeridos."
      );
      expect(emailjs.sendForm).not.toHaveBeenCalled();
    }
  );

  it("sends nombre, edad, correo, telefono and consulta under their own names, and only confirms success after EmailJS resolves", async () => {
    // Snapshot field values synchronously as EmailJS receives the form -
    // the component clears the fields right after a successful send, so
    // reading formEl.value after the fact would see the post-reset state.
    let sentValues;
    emailjs.sendForm.mockImplementationOnce(async (_service, _template, form) => {
      sentValues = {
        nombre: form.elements.namedItem("nombre")?.value,
        edad: form.elements.namedItem("edad")?.value,
        correo: form.elements.namedItem("correo")?.value,
        telefono: form.elements.namedItem("telefono")?.value,
        consulta: form.elements.namedItem("consulta")?.value,
        mail: form.elements.namedItem("mail"),
        cv: form.elements.namedItem("cv"),
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
    expect(sentValues).toEqual({
      nombre: VALID_VALUES.nombre,
      edad: VALID_VALUES.edad,
      correo: VALID_VALUES.correo,
      telefono: VALID_VALUES.telefono,
      consulta: VALID_VALUES.consulta,
      mail: null,
      cv: null,
    });
  });

  it("keeps telefono from crossing into another field (regression: correo/edad used to land under telefono/mail)", async () => {
    let sentValues;
    emailjs.sendForm.mockImplementationOnce(async (_service, _template, form) => {
      sentValues = {
        correo: form.elements.namedItem("correo")?.value,
        telefono: form.elements.namedItem("telefono")?.value,
      };
      return { status: 200, text: "OK" };
    });
    const user = userEvent.setup();
    render(<Trabaja />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /consultar/i }));
    await waitFor(() => expect(toast.success).toHaveBeenCalled());

    expect(sentValues.telefono).toBe(VALID_VALUES.telefono);
    expect(sentValues.correo).toBe(VALID_VALUES.correo);
    expect(sentValues.telefono).not.toBe(sentValues.correo);
  });

  it("submits successfully with just the 5 form fields (no file upload involved)", async () => {
    emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: "OK" });
    const user = userEvent.setup();
    const { container } = render(<Trabaja />);

    expect(container.querySelector('input[type="file"]')).not.toBeInTheDocument();

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /consultar/i }));

    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
  });

  it("shows an error toast and re-enables the button if EmailJS fails for real", async () => {
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

  describe('"Enviar CV por WhatsApp" secondary action', () => {
    it("is not shown before a successful submission", () => {
      render(<Trabaja />);

      expect(
        screen.queryByRole("link", { name: /enviar cv por whatsapp/i })
      ).not.toBeInTheDocument();
    });

    it("stays hidden if EmailJS fails, so the applicant is never told to send a CV for an application that didn't go through", async () => {
      emailjs.sendForm.mockRejectedValueOnce(new Error("network error"));
      const user = userEvent.setup();
      render(<Trabaja />);

      await fillForm(user);
      await user.click(screen.getByRole("button", { name: /consultar/i }));
      await waitFor(() => expect(toast.error).toHaveBeenCalled());

      expect(
        screen.queryByRole("link", { name: /enviar cv por whatsapp/i })
      ).not.toBeInTheDocument();
    });

    it("appears after a successful submission, linking to Pimp's general WhatsApp with a pre-filled message", async () => {
      emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: "OK" });
      const user = userEvent.setup();
      render(<Trabaja />);

      await fillForm(user);
      await user.click(screen.getByRole("button", { name: /consultar/i }));
      await waitFor(() => expect(toast.success).toHaveBeenCalled());

      const cvLink = screen.getByRole("link", {
        name: /enviar cv por whatsapp/i,
      });
      expect(cvLink).toHaveAttribute("target", "_blank");
      expect(cvLink).toHaveAttribute("rel", "noopener noreferrer");

      const href = new URL(cvLink.getAttribute("href"));
      expect(`${href.origin}${href.pathname}`).toBe(
        "https://wa.me/5491126834248"
      );
      expect(href.searchParams.get("text")).toBe(
        "Hola, me postulé desde la web de Pimp. Te envío mi CV."
      );
    });
  });
});

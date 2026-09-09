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

function makeFile(name, type, sizeInBytes = 1024) {
  const file = new File(["contenido"], name, { type });
  Object.defineProperty(file, "size", { value: sizeInBytes });
  return file;
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

  it("submits successfully without a CV (optional field)", async () => {
    emailjs.sendForm.mockResolvedValueOnce({ status: 200, text: "OK" });
    const user = userEvent.setup();
    render(<Trabaja />);

    await fillForm(user);
    await user.click(screen.getByRole("button", { name: /consultar/i }));

    await waitFor(() => expect(toast.success).toHaveBeenCalled());
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
  });

  it("submits successfully with a valid CV and clears the file input afterwards", async () => {
    let cvFileSent;
    emailjs.sendForm.mockImplementationOnce(async (_service, _template, form) => {
      cvFileSent = form.elements.namedItem("cv")?.files?.[0];
      return { status: 200, text: "OK" };
    });
    const user = userEvent.setup();
    render(<Trabaja />);

    await fillForm(user);
    const cvInput = screen.getByLabelText(/adjuntar cv/i);
    const cv = makeFile("cv.pdf", "application/pdf");
    await user.upload(cvInput, cv);

    await user.click(screen.getByRole("button", { name: /consultar/i }));
    await waitFor(() => expect(toast.success).toHaveBeenCalled());

    expect(cvFileSent?.name).toBe("cv.pdf");
    expect(cvInput.value).toBe("");
  });

  it("rejects a CV over 10 MB without submitting, keeping the entered data", async () => {
    const user = userEvent.setup();
    render(<Trabaja />);

    await fillForm(user);
    const cvInput = screen.getByLabelText(/adjuntar cv/i);
    const oversizedCv = makeFile("cv.pdf", "application/pdf", 11 * 1024 * 1024);
    await user.upload(cvInput, oversizedCv);

    await user.click(screen.getByRole("button", { name: /consultar/i }));

    expect(toast.error).toHaveBeenCalledWith("El CV no puede superar los 10 MB.");
    expect(emailjs.sendForm).not.toHaveBeenCalled();
    expect(screen.getByLabelText(FIELD_LABELS.nombre)).toHaveValue(
      VALID_VALUES.nombre
    );
  });

  it("rejects a CV with an invalid extension without submitting, keeping the entered data", async () => {
    // A user can bypass the file picker's `accept` filter (it's a UI hint,
    // not an enforcement mechanism), so the app's own validation - which
    // this test targets - has to catch it too. applyAccept only takes
    // effect via userEvent.setup(), not as a per-upload-call option.
    const user = userEvent.setup({ applyAccept: false });
    render(<Trabaja />);

    await fillForm(user);
    const cvInput = screen.getByLabelText(/adjuntar cv/i);
    const invalidCv = makeFile("cv.exe", "application/octet-stream");
    await user.upload(cvInput, invalidCv);
    await user.click(screen.getByRole("button", { name: /consultar/i }));

    expect(toast.error).toHaveBeenCalledWith(
      "El CV debe ser un archivo PDF, DOC o DOCX."
    );
    expect(emailjs.sendForm).not.toHaveBeenCalled();
    expect(screen.getByLabelText(FIELD_LABELS.consulta)).toHaveValue(
      VALID_VALUES.consulta
    );
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
});

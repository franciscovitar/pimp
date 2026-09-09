import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NavBar from "./Navbar";

describe("NavBar", () => {
  it("renders the same 9 sections as both desktop links and mobile menu links", () => {
    render(<NavBar />);

    const expectedLabels = [
      "Inicio",
      "Nosotros",
      "Servicios",
      "Gift Card",
      "Franquicias",
      "Trabaja en Pimp",
      "Ubicación",
      "Contacto",
    ];

    for (const label of expectedLabels) {
      expect(screen.getAllByText(label).length).toBeGreaterThanOrEqual(2);
    }
  });

  it("marks external links (Reserva online, Franquicias) as target=_blank with rel=noopener", () => {
    render(<NavBar />);

    const reservaLinks = screen.getAllByText(/reserva online/i);
    const desktopReserva = reservaLinks.find(
      (el) => el.getAttribute("href") === "https://pimp.turnosya.com/landing/"
    );
    expect(desktopReserva).toHaveAttribute("target", "_blank");
    expect(desktopReserva).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("opens the mobile menu overlay when the toggle icon is activated", async () => {
    const user = userEvent.setup();
    const { container } = render(<NavBar />);

    const bgDiv = container.querySelector(".bg-div");
    expect(bgDiv).not.toHaveClass("active");

    const toggle = screen.getByRole("button", { name: /abrir menú/i });
    await user.click(toggle);

    expect(bgDiv).toHaveClass("active");
  });
});

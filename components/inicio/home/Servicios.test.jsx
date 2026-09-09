import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Servicios from "./Servicios";
import { services } from "./servicios.data";

describe("Servicios", () => {
  it("renders one desktop gallery and one mobile gallery per service", () => {
    const { container } = render(<Servicios />);

    expect(container.querySelectorAll(".galeria.normal")).toHaveLength(
      services.length
    );
    expect(container.querySelectorAll(".galeria.invert")).toHaveLength(
      services.length
    );
  });

  it("renders every service title twice (desktop pass + mobile pass)", () => {
    render(<Servicios />);

    for (const service of services) {
      expect(screen.getAllByText(service.title)).toHaveLength(2);
    }
  });

  it("keeps the #tratamientos anchor used by the navbar's Servicios link", () => {
    const { container } = render(<Servicios />);
    expect(container.querySelector("#tratamientos")).not.toBeNull();
  });
});

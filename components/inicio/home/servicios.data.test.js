import { describe, it, expect } from "vitest";
import { services } from "./servicios.data";

describe("servicios.data", () => {
  it("has exactly the 7 services shown on the site", () => {
    expect(services).toHaveLength(7);
  });

  it("gives every service the fields ServicioGaleria needs to render", () => {
    for (const service of services) {
      expect(service.id).toBeTruthy();
      expect(service.title).toBeTruthy();
      expect(service.text).toBeTruthy();
      expect(service.image).toBeTruthy();
      expect(Array.isArray(service.items)).toBe(true);
      expect(["text-image", "image-text"]).toContain(service.desktopLayout);
    }
  });

  it("has unique ids (used as React keys for both desktop and mobile passes)", () => {
    const ids = services.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";

// jsdom doesn't implement IntersectionObserver, which framer-motion's
// `whileInView` animations rely on. Tests only assert on DOM content, not
// on animation state, so a no-op stub is enough to let components mount.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.IntersectionObserver = IntersectionObserverStub;

// next/image needs Next's webpack build (static import -> {src, width,
// height}) to size images automatically. Under Vite/Vitest, imported image
// files resolve to a plain URL string instead, so next/image throws. Tests
// don't exercise image optimization, so it's swapped for a plain <img>.
vi.mock("next/image", () => ({
  default: ({ src, alt = "", ...rest }) => {
    const resolvedSrc = typeof src === "string" ? src : src?.src ?? "";
    return <img src={resolvedSrc} alt={alt} {...rest} />;
  },
}));

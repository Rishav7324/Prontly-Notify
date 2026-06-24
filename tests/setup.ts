import "@testing-library/jest-dom/vitest";

// Mock Next.js server-only module for vitest
vi.mock("server-only", () => ({}));

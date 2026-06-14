/**
 * Unit tests for useLocalStorage hook.
 *
 * These tests verify SSR safety, initial value fallback, and client-side persistence.
 * Run with: npx vitest run
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

// Mock localStorage for Node environment
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((index: number) => Object.keys(store)[index] ?? null),
  };
})();

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
  writable: true,
});

// Import the hook after mocking
import { useLocalStorage } from "@/hooks/useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it("returns the initial value before hydration (SSR-safe)", () => {
    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default")
    );

    // Before effects run, should be the default
    expect(result.current[0]).toBe("default");
  });

  it("reads existing value from localStorage on mount", () => {
    localStorageMock.setItem("test-key", JSON.stringify("stored-value"));

    const { result } = renderHook(() =>
      useLocalStorage("test-key", "default")
    );

    // After effect runs, should pick up stored value
    expect(result.current[0]).toBe("stored-value");
  });

  it("falls back to initial value when localStorage is empty", () => {
    const { result } = renderHook(() =>
      useLocalStorage("empty-key", 42)
    );

    expect(result.current[0]).toBe(42);
  });

  it("updates localStorage when setValue is called", () => {
    const { result } = renderHook(() =>
      useLocalStorage("write-key", "initial")
    );

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "write-key",
      JSON.stringify("updated")
    );
  });

  it("supports functional updater", () => {
    const { result } = renderHook(() =>
      useLocalStorage<number>("count-key", 0)
    );

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });

  it("removes the key from localStorage on removeValue", () => {
    localStorageMock.setItem("rm-key", JSON.stringify("data"));

    const { result } = renderHook(() =>
      useLocalStorage("rm-key", "default")
    );

    act(() => {
      result.current[2]();
    });

    expect(localStorageMock.removeItem).toHaveBeenCalledWith("rm-key");
    expect(result.current[0]).toBe("default");
  });

  it("handles corrupt JSON gracefully", () => {
    localStorageMock.setItem("bad-key", "not-valid-json");

    // Should not throw — falls back to initial
    expect(() => {
      renderHook(() => useLocalStorage("bad-key", "safe"));
    }).not.toThrow();
  });
});

/// <reference types="bun" />
import { describe, expect, test } from "bun:test";
import { canPayForSwap, isValidSwapSelection, toggleSwapSelection } from "./swap-rules";

describe("swap selection and approval", () => {
  test("direct exchange offers exactly one garment", () => {
    expect(toggleSwapSelection(["shirt"], "jacket", true)).toEqual(["jacket"]);
    expect(isValidSwapSelection(["shirt", "jacket"], true)).toBe(false);
    expect(canPayForSwap(true, ["jacket"])).toBe(true);
    expect(canPayForSwap(true, [])).toBe(false);
  });
  test("owner approval accepts multiple unique garments but no duplicates", () => {
    expect(toggleSwapSelection(["shirt"], "jacket", false)).toEqual(["shirt", "jacket"]);
    expect(toggleSwapSelection(["shirt"], "shirt", false)).toEqual([]);
    expect(isValidSwapSelection(["shirt", "jacket"], false)).toBe(true);
    expect(isValidSwapSelection(["shirt", "shirt"], false)).toBe(false);
    expect(isValidSwapSelection([], false)).toBe(false);
  });
  test("owner approval requests never allow payment before approval", () => {
    expect(canPayForSwap(false, ["shirt"])).toBe(false);
    expect(canPayForSwap(false, ["shirt", "jacket"])).toBe(false);
  });
});
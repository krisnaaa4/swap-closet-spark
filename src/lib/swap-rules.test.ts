import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { canPayForSwap, isValidSwapSelection, toggleSwapSelection } from "./swap-rules";

describe("swap selection and approval", () => {
  test("direct exchange offers exactly one garment", () => {
    assert.deepEqual(toggleSwapSelection(["shirt"], "jacket", true), ["jacket"]);
    assert.equal(isValidSwapSelection(["shirt", "jacket"], true), false);
    assert.equal(canPayForSwap(true, ["jacket"]), true);
    assert.equal(canPayForSwap(true, []), false);
  });
  test("owner approval accepts multiple unique garments but no duplicates", () => {
    assert.deepEqual(toggleSwapSelection(["shirt"], "jacket", false), ["shirt", "jacket"]);
    assert.deepEqual(toggleSwapSelection(["shirt"], "shirt", false), []);
    assert.equal(isValidSwapSelection(["shirt", "jacket"], false), true);
    assert.equal(isValidSwapSelection(["shirt", "shirt"], false), false);
    assert.equal(isValidSwapSelection([], false), false);
  });
  test("owner approval requests never allow payment before approval", () => {
    assert.equal(canPayForSwap(false, ["shirt"]), false);
    assert.equal(canPayForSwap(false, ["shirt", "jacket"]), false);
  });
});
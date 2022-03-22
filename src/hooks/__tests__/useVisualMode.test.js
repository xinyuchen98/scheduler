// useVisualMode tests
import { renderHook, act } from "@testing-library/react-hooks";

import useVisualMode from "hooks/useVisualMode";

// Mock modes for testing
const FIRST = "FIRST";
const SECOND = "SECOND";
const THIRD = "THIRD";

test("useVisualMode should initialize with default value", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should transition to another mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);
});

test("useVisualMode should return to previous mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Transit to second mode
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  // Transit to third mode
  act(() => result.current.transition(THIRD));
  expect(result.current.mode).toBe(THIRD);

  // Go back to second mode
  act(() => result.current.back());
  expect(result.current.mode).toBe(SECOND);

  // Go back to first mode
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should not return to previous mode if already at initial", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});

test("useVisualMode should replace the current mode", () => {
  const { result } = renderHook(() => useVisualMode(FIRST));

  // Transit to second mode
  act(() => result.current.transition(SECOND));
  expect(result.current.mode).toBe(SECOND);

  // Transit to third mode with replace set to true
  act(() => result.current.transition(THIRD, true));
  expect(result.current.mode).toBe(THIRD);

  // Go back to first mode
  act(() => result.current.back());
  expect(result.current.mode).toBe(FIRST);
});
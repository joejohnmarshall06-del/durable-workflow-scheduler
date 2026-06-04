import test from "node:test";
import assert from "node:assert/strict";
import { Scheduler } from "../src/index.js";
test("retries failed jobs", () => {
  let count = 0; const s = new Scheduler();
  s.add({ id: "a", retries: 1, task: () => { if (++count === 1) throw new Error("no"); } });
  s.tick(); s.tick(200);
  assert.equal(s.jobs.get("a").status, "done");
});
test("waits for dependencies", () => {
  const s = new Scheduler(); let ran = false;
  s.add({ id: "a", task: () => {} }); s.add({ id: "b", deps: ["a"], task: () => { ran = true; } });
  s.tick(); assert.equal(ran, true);
});

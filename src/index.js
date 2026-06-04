export class Scheduler {
  constructor() { this.jobs = new Map(); this.now = 0; }
  add(job) { this.jobs.set(job.id, { attempts: 0, status: "queued", runAt: this.now, deps: [], ...job }); }
  tick(ms = 1) {
    this.now += ms;
    let progressed = true;
    while (progressed) {
      progressed = false;
      const runnable = [...this.jobs.values()].filter((job) => job.status === "queued" && job.runAt <= this.now && job.deps.every((id) => this.jobs.get(id)?.status === "done"));
      for (const job of runnable) {
        this.run(job);
        progressed = true;
      }
    }
  }
  run(job) {
    job.attempts += 1;
    try { job.task(); job.status = "done"; }
    catch (error) {
      if (job.attempts > (job.retries || 0)) { job.status = "failed"; job.error = error.message; }
      else { job.runAt = this.now + Math.pow(2, job.attempts) * 100; }
    }
  }
  state() { return [...this.jobs.values()].map(({ task, ...job }) => job); }
}

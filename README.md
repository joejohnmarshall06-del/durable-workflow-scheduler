# Durable Workflow Scheduler

In-memory durable workflow scheduler model with retries, exponential backoff, dependencies, and deterministic ticking.

## Why It Is Strong

- Focuses on a real infrastructure problem.
- Runs locally with zero runtime dependencies.
- Includes tests for core behavior.
- Small enough to inspect, large enough to extend.
- Suitable for portfolio, interview, and open-source growth.

## Run

```bash
npm test
```

## Example

See `src/index.js` and `test/index.test.js` for the runnable core.

## Roadmap

- Add CLI commands.
- Add persistence adapters.
- Add benchmark suite.
- Add GitHub Actions CI.
- Add web dashboard where useful.

## License

MIT

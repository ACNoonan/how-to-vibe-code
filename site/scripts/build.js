#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

const hasTinaCreds =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN;

if (hasTinaCreds) {
  console.log(
    "Detected Tina Cloud credentials. Running `tinacms build` before Next.js build."
  );
  const tinaResult = runCommand("tinacms", ["build"], { allowFailure: true });
  if (tinaResult.status !== 0) {
    const combinedOutput = `${tinaResult.stdout ?? ""}${tinaResult.stderr ?? ""}`;
    if (combinedOutput.includes("Branch is not on TinaCloud")) {
      console.warn(
        "TinaCloud branch not found. Skipping schema generation and continuing with Next.js build."
      );
    } else {
      process.exit(tinaResult.status ?? 1);
    }
  }
} else {
  console.log(
    "Skipping `tinacms build` because NEXT_PUBLIC_TINA_CLIENT_ID or TINA_TOKEN is not set."
  );
}

runCommand("next", ["build"]);

function runCommand(command, args, options = {}) {
  const { allowFailure = false } = options;
  const result = spawnSync(command, args, {
    stdio: "pipe",
    encoding: "utf8",
  });
  if (result.stdout) {
    process.stdout.write(result.stdout);
  }
  if (result.stderr) {
    process.stderr.write(result.stderr);
  }
  if (result.status !== 0 && !allowFailure) {
    process.exit(result.status ?? 1);
  }
  return result;
}

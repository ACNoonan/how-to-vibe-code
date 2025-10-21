#!/usr/bin/env node

const { spawnSync } = require("node:child_process");

const hasTinaCreds =
  process.env.NEXT_PUBLIC_TINA_CLIENT_ID && process.env.TINA_TOKEN;

if (hasTinaCreds) {
  console.log(
    "Detected Tina Cloud credentials. Running `tinacms build` before Next.js build."
  );
  runCommand("tinacms", ["build"]);
} else {
  console.log(
    "Skipping `tinacms build` because NEXT_PUBLIC_TINA_CLIENT_ID or TINA_TOKEN is not set."
  );
}

runCommand("next", ["build"]);

function runCommand(command, args) {
  const result = spawnSync(command, args, { stdio: "inherit" });
  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

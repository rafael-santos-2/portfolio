/**
 * Creates Google Secret Manager secrets from a .env file and links them
 * to the secret names defined in apphosting.beta.yaml.
 *
 * Usage:
 *   npx tsx scripts/create-secrets.ts --project=<GCP_PROJECT_ID> --env=.env.local
 *
 * Prerequisites:
 *   npm install -D @google-cloud/secret-manager tsx dotenv
 *   gcloud auth application-default login
 */

import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import * as fs from "fs";
import * as path from "path";

// ---------------------------------------------------------------------------
// CLI args
// ---------------------------------------------------------------------------

function getArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const arg = process.argv.find((a) => a.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : undefined;
}

const projectId = getArg("project");
const envFile = getArg("env") ?? ".env.local";

if (!projectId) {
  console.error("Error: --project=<GCP_PROJECT_ID> is required.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Parse .env file
// ---------------------------------------------------------------------------

function parseEnvFile(filePath: string): Record<string, string> {
  const resolved = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolved)) {
    console.error(`Error: env file not found at ${resolved}`);
    process.exit(1);
  }

  const result: Record<string, string> = {};
  const lines = fs.readFileSync(resolved, "utf-8").split("\n");

  for (const raw of lines) {
    const line = raw.trim();
    if (!line || line.startsWith("#")) continue;

    const eq = line.indexOf("=");
    if (eq === -1) continue;

    const key = line.slice(0, eq).trim();
    let value = line.slice(eq + 1).trim();

    // Strip surrounding quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    result[key] = value;
  }

  return result;
}

// ---------------------------------------------------------------------------
// Secret names that must exist (from apphosting.beta.yaml)
// ---------------------------------------------------------------------------

const SECRET_KEYS = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APPID",
  "NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID",
  "NEXT_PUBLIC_FIRESTORE",
  "NEXT_PUBLIC_FIRESTORAGE",
  "FIREBASE_PRIVATE_KEY",
  "FIREBASE_CLIENT_EMAIL",
] as const;

// ---------------------------------------------------------------------------
// Secret Manager helpers
// ---------------------------------------------------------------------------

const client = new SecretManagerServiceClient();

async function secretExists(secretName: string): Promise<boolean> {
  try {
    await client.getSecret({ name: secretName });
    return true;
  } catch (err: unknown) {
    if ((err as { code?: number }).code === 5 /* NOT_FOUND */) return false;
    throw err;
  }
}

async function createSecret(secretId: string): Promise<void> {
  await client.createSecret({
    parent: `projects/${projectId}`,
    secretId,
    secret: { replication: { automatic: {} } },
  });
  console.log(`  Created secret: ${secretId}`);
}

async function addSecretVersion(
  secretName: string,
  value: string
): Promise<void> {
  await client.addSecretVersion({
    parent: secretName,
    payload: { data: Buffer.from(value, "utf-8") },
  });
  console.log(`  Added version to: ${secretName}`);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log(`Project  : ${projectId}`);
  console.log(`Env file : ${envFile}\n`);

  const env = parseEnvFile(envFile);
  const parent = `projects/${projectId}`;

  for (const key of SECRET_KEYS) {
    const value = env[key];

    if (!value) {
      console.warn(`[SKIP] ${key} — not found in ${envFile}`);
      continue;
    }

    console.log(`[${key}]`);

    const secretName = `${parent}/secrets/${key}`;

    if (await secretExists(secretName)) {
      console.log(`  Secret already exists, adding new version.`);
    } else {
      await createSecret(key);
    }

    await addSecretVersion(secretName, value);
  }

  console.log("\nDone.");
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

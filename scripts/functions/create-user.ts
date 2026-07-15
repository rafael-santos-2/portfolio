/**
 * Creates a Firebase Auth user with full profile info, custom claims,
 * and a matching Firestore document in the 'users' collection.
 *
 * Usage:
 *   cd scripts && npm run create-user
 *
 * Optional CLI args (skips interactive prompt for that field):
 *   --env=.env.local
 *   --project=<GCP_PROJECT_ID>
 *   --firestore=<FIRESTORE_DATABASE_ID>
 *
 * Prerequisites:
 *   npm install  (inside scripts/)
 *   gcloud auth application-default login  (or set GOOGLE_APPLICATION_CREDENTIALS)
 */

import * as dotenv from "dotenv";
import * as path from "path";
import * as readline from "readline";
import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";



// ---------------------------------------------------------------------------
// Colors
// ---------------------------------------------------------------------------

const c = {
  reset:  '\x1b[0m',
  bold:   '\x1b[1m',
  red:    '\x1b[31m',
  green:  '\x1b[32m',
  yellow: '\x1b[33m',
  cyan:   '\x1b[36m',
  gray:   '\x1b[90m',
};

function log_info  (msg: string) { console.log(`${c.cyan}${msg}${c.reset}`); }
function log_ok    (msg: string) { console.log(`${c.green}${msg}${c.reset}`); }
function log_warn  (msg: string) { console.warn(`${c.yellow}${msg}${c.reset}`); }
function log_error (msg: string) { console.error(`${c.red}${msg}${c.reset}`); }
function log_label (key: string, val: string) { console.log(`  ${c.gray}${key.padEnd(12)}${c.reset}: ${val}`); }



// ---------------------------------------------------------------------------
// CLI args (only used for env/project/firestore — rest is prompted)
// ---------------------------------------------------------------------------

function getArg(name: string): string | undefined {
  const prefix = `--${name}=`;
  const arg = process.argv.find((a) => a.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : undefined;
}



// ---------------------------------------------------------------------------
// Load .env
// ---------------------------------------------------------------------------

const envFile = getArg("env") ?? "../.env.local";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });



// ---------------------------------------------------------------------------
// Firebase config (from .env or CLI arg)
// ---------------------------------------------------------------------------

const PROJECT_ID   = getArg("project")   ?? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "";
const CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL ?? "";
const PRIVATE_KEY  = (process.env.FIREBASE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");
const FIRESTORE_DB = getArg("firestore") ?? process.env.NEXT_PUBLIC_FIRESTORE ?? "(default)";

if (!PROJECT_ID)   { log_error("Error: Firebase project ID missing. Use --project= or NEXT_PUBLIC_FIREBASE_PROJECT_ID."); process.exit(1); }
if (!CLIENT_EMAIL) { log_error("Error: FIREBASE_CLIENT_EMAIL missing in env file."); process.exit(1); }
if (!PRIVATE_KEY)  { log_error("Error: FIREBASE_PRIVATE_KEY missing in env file."); process.exit(1); }



// ---------------------------------------------------------------------------
// Firebase Admin init
// ---------------------------------------------------------------------------

if (!getApps().length) {
  initializeApp({
    credential: cert({ projectId: PROJECT_ID, clientEmail: CLIENT_EMAIL, privateKey: PRIVATE_KEY }),
  }, "script");
}

const APP       = getApp("script");
const AUTH      = getAuth(APP);
const FIRESTORE = getFirestore(APP, FIRESTORE_DB);



// ---------------------------------------------------------------------------
// Interactive prompt helpers
// ---------------------------------------------------------------------------

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => resolve(answer.trim()));
  });
}

async function askRequired(question: string): Promise<string> {
  while (true) {
    const value = await ask(question);
    if (value) return value;
    log_warn("  This field is required. Please enter a value.");
  }
}

async function askOptional(question: string): Promise<string | undefined> {
  const value = await ask(`${question} (optional, press Enter to skip): `);
  return value || undefined;
}

const VALID_ROLES = ["Developer", "Admin"] as const;
type TUserRole = typeof VALID_ROLES[number];

async function askRole(): Promise<TUserRole> {
  while (true) {
    const value = await ask(`Role [${VALID_ROLES.join(" / ")}] (default: Admin): `);
    const role = value || "Admin";
    if (VALID_ROLES.includes(role as TUserRole)) return role as TUserRole;
    log_warn(`  Invalid role. Choose one of: ${VALID_ROLES.join(", ")}`);
  }
}



// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {

  console.log(`\n${c.bold}${c.cyan}=== Create Firebase User ===${c.reset}\n`);

  // Prompt for each field
  const EMAIL      = await askRequired("Email address: ");
  const PASSWORD   = await askRequired("Password: ");
  const FIRST_NAME = await askRequired("First name: ");
  const LAST_NAME  = await askRequired("Last name: ");
  const ROLE       = await askRole();
  const PHONE      = await askOptional("Phone number");
  const PHOTO_URL  = await askOptional("Photo URL");

  // Extra claims (optional JSON)
  let EXTRA_CLAIMS: Record<string, unknown> = {};
  while (true) {
    const rawClaims = await askOptional('Extra custom claims (JSON, e.g. {"key":"value"})');
    if (!rawClaims) break;
    try {
      EXTRA_CLAIMS = JSON.parse(rawClaims);
      break;
    } catch {
      log_warn('  Invalid JSON. Try again or press Enter to skip.');
    }
  }

  rl.close();

  // Summary
  console.log(`\n${c.bold}--- Summary ---${c.reset}`);
  log_label("Email",       EMAIL);
  log_label("Name",        `${FIRST_NAME} ${LAST_NAME}`);
  log_label("Role",        ROLE);
  if (PHONE)     log_label("Phone",     PHONE);
  if (PHOTO_URL) log_label("Photo URL", PHOTO_URL);
  if (Object.keys(EXTRA_CLAIMS).length) log_label("Extra claims", JSON.stringify(EXTRA_CLAIMS));
  log_label("Project",    PROJECT_ID);
  log_label("Firestore",  FIRESTORE_DB);
  console.log();


  // ---------------------------------------------------------------------------
  // Check email uniqueness in Firestore
  // ---------------------------------------------------------------------------

  const existing = await FIRESTORE
    .collection("users")
    .where("email", "==", EMAIL)
    .where("is_deleted", "==", false)
    .count()
    .get();

  if (existing.data().count > 0) {
    log_error("Error: A user with this email already exists in Firestore.");
    process.exit(1);
  }


  // ---------------------------------------------------------------------------
  // Reserve Firestore doc ID
  // ---------------------------------------------------------------------------

  const USER_REF = FIRESTORE.collection("users").doc();
  const USER_ID  = USER_REF.id;
  log_info(`[1/3] Firestore doc ID reserved: ${USER_ID}`);


  // ---------------------------------------------------------------------------
  // Create Firestore document
  // ---------------------------------------------------------------------------

  const now = new Date();

  await USER_REF.set({
    id:               USER_ID,
    firstName:        FIRST_NAME,
    lastName:         LAST_NAME,
    email:            EMAIL,
    role:             ROLE,
    path_avatar:      PHOTO_URL ?? null,

    is_disabled:      false,
    date_disabled:    null,

    last_seen_version: null,

    id_creator:   null,
    id_updater:   null,
    id_deleter:   null,
    date_created: now,
    date_updated: null,
    date_deleted: null,
    is_deleted:   false,
  });

  log_info(`[2/3] Firestore document created in 'users/${USER_ID}'`);


  // ---------------------------------------------------------------------------
  // Create Auth user (same UID as Firestore doc)
  // ---------------------------------------------------------------------------

  const authUserCreate: Record<string, unknown> = {
    uid:           USER_ID,
    email:         EMAIL,
    password:      PASSWORD,
    emailVerified: false,
    disabled:      false,
    displayName:   `${FIRST_NAME} ${LAST_NAME}`.trim(),
  };

  if (PHONE)     authUserCreate.phoneNumber = PHONE;
  if (PHOTO_URL) authUserCreate.photoURL    = PHOTO_URL;

  const NEW_USER = await AUTH.createUser(authUserCreate as Parameters<typeof AUTH.createUser>[0]);


  // ---------------------------------------------------------------------------
  // Set custom claims
  // ---------------------------------------------------------------------------

  const claims: Record<string, unknown> = {
    role:       ROLE,
    idDatabase: FIRESTORE_DB,
    ...EXTRA_CLAIMS,
  };

  await AUTH.setCustomUserClaims(NEW_USER.uid, claims);

  log_info(`[3/3] Auth user created with custom claims:`);
  log_label("UID",    NEW_USER.uid);
  log_label("Email",  NEW_USER.email ?? "");
  log_label("Claims", JSON.stringify(claims));

  log_ok("\nDone. User created successfully.\n");
}

main().catch((err) => {
  rl.close();
  log_error(`\nFatal error: ${err?.message ?? err}`);
  process.exit(1);
});

# Bird Larsen Template

A production-ready Next.js template with Firebase integration, Material UI, internationalization, authentication, and a comprehensive component library. Built for admin dashboards and SaaS platforms.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js (App Router) |
| UI | Material UI (MUI v7) |
| Styling | CSS Modules + Emotion |
| Forms | React Hook Form |
| i18n | i18next + react-i18next |
| Backend | Firebase (Firestore, Storage, Auth, Functions) |
| Charts | ApexCharts |
| Editor | TipTap |
| Animation | Framer Motion |
| Notifications | Sonner |
| PDF | @react-pdf/renderer |
| Language | TypeScript |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your Firebase credentials:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APPID` | Firebase app ID |
| `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID` | Firebase measurement ID |
| `NEXT_PUBLIC_FIRESTORE` | Firestore database name |
| `NEXT_PUBLIC_FIRESTORAGE` | Firebase Storage bucket name |
| `FIREBASE_PRIVATE_KEY` | Firebase Admin private key (server-side) |
| `FIREBASE_CLIENT_EMAIL` | Firebase Admin client email (server-side) |
| `NEXT_PUBLIC_DEBUGMODE` | Enable debug mode (`true` / `false`) |
| `NEXT_PUBLIC_VERSION` | App version string |

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
Bird-Larsen-Template/
├── app/                        # Next.js App Router
│   ├── (authentication)/       # Auth pages (sign-in, forgot-password)
│   ├── api/                    # API routes (user CRUD)
│   ├── platform/               # Main app pages
│   │   ├── profile/
│   │   ├── settings/
│   │   └── team/
│   └── test/                   # Component test/preview pages
├── components/                 # Reusable UI primitives
│   ├── buttons/
│   ├── chart/
│   ├── editor/
│   ├── file-thumbnail/
│   ├── form/                   # RHF-wrapped form fields
│   ├── icons/
│   ├── image/
│   ├── label/
│   ├── loader/
│   ├── logo/
│   ├── snackbar/
│   └── upload/
├── widgets/                    # Feature-level composed components
│   ├── card-file/
│   ├── info/
│   │   └── info-item/
│   ├── navigation/
│   ├── popover/
│   ├── popup/
│   ├── table/                  # Full table system
│   │   ├── table-cell/
│   │   ├── table-filters/
│   │   ├── table-head/
│   │   ├── table-no-data/
│   │   ├── table-pagination/
│   │   ├── table-selected-action/
│   │   └── table-skeleton/
│   └── tabs/
├── providers/                  # React context providers
│   ├── app/
│   ├── authentication/
│   ├── language/               # i18n setup + translations
│   └── theme/
├── layouts/                    # Page layout shells
├── guards/                     # Route access guards
├── hooks/                      # Custom React hooks
├── config/                     # App, theme, navigation, paths
├── database/                   # Firestore setup
├── functions/                  # Firebase Cloud Functions
├── types/                      # Global TypeScript types
├── css/                        # Global styles
└── data/                       # Static data
```

---

## Internationalization (i18n)

The template supports multiple languages out of the box via `i18next`.

**Supported languages**: English (`en`), Dutch (`nl`)

Translation files are located at `providers/language/langs/`:
- `en.json`
- `nl.json`

Language is auto-detected from the browser and persisted via a cookie (`i18next`). Use the `useTranslate` hook in client components:

```tsx
import { useTranslate } from '@/providers/language';

const { t } = useTranslate();

t('components.infoItem.empty') // → "Not found"
```

To add a new language:
1. Add a new JSON file in `providers/language/langs/`
2. Register it in `providers/language/all-langs.ts`

---

## Components

### Form fields (`components/form/`)

All form fields are wrapped with React Hook Form via `Controller`. Available fields:

- `RHFTextField` — text input
- `RHFPassword` — password with show/hide toggle
- `RHFSelect` / `RHFMultiSelect` — dropdowns
- `RHFAutocomplete` — searchable select
- `RHFCheckbox` / `RHFMultiCheckbox` — checkboxes
- `RHFSwitch` / `RHFMultiSwitch` — toggles
- `RHFRadioGroup` — radio buttons
- `RHFRating` — star rating
- `RHFSlider` — range slider
- `RHFDatePicker` / `RHFDateTimePicker` / `RHFTimePicker` — date & time
- `RHFEditor` — rich text (TipTap)
- `RHFUploadAvatar` / `RHFUploadBox` — file upload

### Icons (`components/icons/`)

Icons are React components wrapping SVGs. Import from `@/components/icons`:

```tsx
import { IconTrash, IconPlus, IconCopy } from '@/components/icons';
```

### Info item (`widgets/info/info-item/`)

Displays a labeled value with loading, empty, copyable, and clickable states.

```tsx
import { InfoItem } from '@/widgets/info/info-item';

<InfoItem title="Email" value="hello@example.com" copyable />
<InfoItem title="Status" loading />
<InfoItem title="Role" value={null} />
```

Props:

| Prop | Type | Description |
|---|---|---|
| `title` | `string` | Optional label above the value |
| `value` | `string \| number \| ReactNode \| null` | The value to display |
| `valueColor` | `'primary' \| 'secondary' \| 'error' \| 'warning' \| 'info' \| 'success'` | MUI color for the value text |
| `loading` | `boolean` | Shows a skeleton |
| `emptyLabel` | `string` | Custom text when value is empty (default: `t('components.infoItem.empty')`) |
| `onClick` | `() => void` | Makes the value a clickable link-style text |
| `copyable` | `boolean` | Adds a copy-to-clipboard button |

### Card File (`widgets/card-file/`)

Displays a file card with a preview thumbnail, file name, and a dropdown menu with download and delete actions. Supports both local (staged) and remote (Firestore/Storage) files.

```tsx
import CardFile from '@/widgets/card-file';

<CardFile file={file} onDelete={handleDelete} />
```

---

### Table (`widgets/table/`)

Full-featured table system. Import from `@/widgets/table`:

```tsx
import {
  TableCell,
  TableHead,
  TableNoData,
  TablePagination,
  TableSkeleton,
  TableFilters,
  TableSelectedAction,
  useColumnVisibility,
} from '@/widgets/table';
```

**`TableCell`** — enhanced MUI `TableCell` with loading and empty states:

```tsx
<TableCell loading={isLoading}>{row.name}</TableCell>
<TableCell>{row.email}</TableCell>
<TableCell emptyLabel="—">{row.phone}</TableCell>
```

Props:

| Prop | Type | Description |
|---|---|---|
| `children` | `ReactNode` | Cell content |
| `loading` | `boolean` | Shows a skeleton |
| `emptyLabel` | `string` | Custom empty text (default: `"N/A"`) |
| `...TableCellProps` | — | All standard MUI `TableCellProps` |

### Popups (`widgets/popup/`)

Pre-built popup components built on top of the general `Popup` wrapper:

| Component | Description |
|---|---|
| `PopupConfirm` | Generic confirmation dialog with customizable title, description, and actions |
| `PopupDeleteConfirm` | Pre-configured delete confirmation dialog |
| `PopupWhatsNew` | Shows new patch notes to users on first visit after a version update |
| `PopupMaintenanceUpcoming` | Notifies users of a planned maintenance window |
| `PopupCreateTeamMember` | Form popup for creating a new team member |

---

### Maintenance (`widgets/maintenance/`)

Blocks the entire UI with a fullscreen overlay when the app is under active maintenance.

```tsx
// Automatically handled in layout-platform.tsx
{maintenance.active && <MaintenanceScreen maintenance={maintenance.active} />}
```

The overlay is rendered via `createPortal` to `document.body` with `z-index: 9999` and respects iOS safe areas.

---

## System Features

### What's New / Patch Notes

Users see a popup with new patch notes on their first visit after an app update.

- Patch notes are stored in `data/changelog/` as versioned files (e.g. `v1.0.0.ts`)
- The user's `last_seen_version` field in Firestore tracks which version they last saw
- On login, the popup shows all versions newer than `last_seen_version`
- New users receive the current version immediately, so they never see historical notes
- The popup is suppressed in development (`NODE_ENV !== 'production'`)

### Maintenance Mode

Manage planned and active maintenance windows via the `maintenance` Firestore collection.

**Document structure (`IMaintenance`):**

| Field | Type | Description |
|---|---|---|
| `title` | `string` | Title shown on the blocking screen |
| `message` | `string` | Description of the maintenance |
| `scheduled_start` | `Date` | Start of the maintenance window |
| `scheduled_end` | `Date` | End of the maintenance window |
| `is_active` | `boolean` | Must be `true` for the document to be picked up |

**Behavior:**

- **Upcoming** (`now < scheduled_start`): Shows a dismissible popup. Dismissal is stored per maintenance ID in `localStorage` so the user only sees it once.
- **Active** (`scheduled_start ≤ now ≤ scheduled_end`): Blocks the entire app with a fullscreen screen.
- State auto-transitions every 60 seconds without a page reload.

---

## Firebase

### Firestore & Storage rules

Separate rules for development and production environments:

- `firestore.development.rules` / `firestore.production.rules`
- `storage.development.rules` / `storage.production.rules`

### Cloud Functions

Firebase Functions are located in `functions/` and written in TypeScript:

```
functions/
├── calls/       # Callable functions (client-invoked)
├── jobs/        # Scheduled background jobs
├── triggers/    # Firestore/Auth event triggers
├── config/
├── types/
└── utils/
```

### Deployment

The project uses Firebase App Hosting with separate configs per environment:

- `apphosting.beta.yaml` — beta environment
- `apphosting.production.yaml` — production environment

To deploy:

```bash
firebase deploy
```

---

## Theme

The theme is configured in `config/theme.ts`. It supports light and dark mode via MUI's CSS variables (`data-color-scheme`).

**Font families:**
- Primary: Public Sans Variable
- Secondary: Barlow

**Color palette:** Primary (green), Secondary (purple), Info (cyan), Success (green), Warning (amber), Error (red).

To customize, edit `config/theme.ts` and the theme component overrides in `providers/theme/components/`.

---

## Authentication

Authentication is handled via Firebase Auth and wrapped in `providers/authentication/`. Route protection is managed through guards in `guards/`.

API routes in `app/api/user/` handle server-side user management (create, update, delete, disable, password reset) using the Firebase Admin SDK.

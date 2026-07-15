import { ReactNode } from "react";
import { TIconName } from "@/components/icon/icons.types";
import { IGuardRole } from "@/guards/guard/guard.type";
import { PATHS } from "./paths";

import Icon from "@/components/icon";
import Popup_user from "@/widgets/popups/user/popup-user";
import Popup_login from "@/widgets/popups/login/popup-login";

export function resolveNavIcon(icon: string | ReactNode): ReactNode {
  if (typeof icon === "string") return <Icon name={icon as TIconName} />;
  return icon;
}

export type TNavigationItem = {
  label: string;
  icon: TIconName | ReactNode;
  path: string;
  caption?: string;
  actions?: TNavigationAction[];
  subNavigation?: TNavigationConfig;
  exact?: boolean;
  roles?: IGuardRole[];
};

export type TNavigationAction = {
  label: string;
  icon?: TIconName | ReactNode;
  color?: string;
  path?: string;
  popup?: (close: () => void) => ReactNode;
  callback?: (resp: unknown) => void;
};

export type TNavigationGroup = {
  title?: string;
  actions?: TNavigationAction[];
  items: TNavigationItem[];
  roles?: IGuardRole[];
};

export type TNavigationConfig = TNavigationGroup[];

export const NAVIGATION_CONFIG: TNavigationConfig = [
  {
    items: [
      {
        label: "navigation.dashboard",
        icon: "dashboard",
        path: PATHS.PLATFORM.ROOT,
        exact: true,
      },
      {
        label: "navigation.team",
        icon: "user-group",
        path: PATHS.PLATFORM.TEAM.ROOT,
      },
      {
        label: "Components",
        icon: "test-tube",
        path: PATHS.PLATFORM.COMPONENTS.ROOT,
        subNavigation: [
          {
            title: "Header actions",
            actions: [
              {
                label: "Edit profile",
                icon: <Icon name="person" />,
                popup: (close) => <Popup_user open onClose={close} />,
              },
              {
                label: "Sign in",
                icon: <Icon name="lock-close" />,
                popup: (close) => <Popup_login open onClose={close} />,
              },
            ],
            items: [
              {
                label: "Table",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.TABLE,
              },
              {
                label: "Popup",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.POPUP,
              },
              {
                label: "Tabs",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.TABS,
              },
              {
                label: "Popover",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.POPOVER,
              },
              {
                label: "Calendar",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.CALENDAR,
              },
              {
                label: "Notifications",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.NOTIFICATIONS,
              },
              {
                label: "Card File",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.CARD_FILE,
              },
              {
                label: "Info Item",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.INFO_ITEM,
              },
              {
                label: "Logs",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.LOGS,
              },
              {
                label: "Error logs",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.ERROR_LOGS,
              },
              {
                label: "Maintenance",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.MAINTENANCE,
              },
              {
                label: "Snackbar",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.SNACKBAR,
              },
              {
                label: "Editor",
                icon: "test-tube",
                path: PATHS.PLATFORM.COMPONENTS.EDITOR,
              },
            ],
          },
        ],
      },
      {
        label: "General",
        icon: "test-tube",
        path: PATHS.PLATFORM.GENERAL.ROOT,
        subNavigation: [
          {
            items: [
              {
                label: "Loading",
                icon: "test-tube",
                path: PATHS.PLATFORM.GENERAL.LOADING,
              },
              {
                label: "Not Found",
                icon: "test-tube",
                path: PATHS.PLATFORM.GENERAL.NOT_FOUND,
              },
              {
                label: "Empty",
                icon: "test-tube",
                path: PATHS.PLATFORM.GENERAL.EMPTY,
              },
              {
                label: "No Permission",
                icon: "test-tube",
                path: PATHS.PLATFORM.GENERAL.NO_PERMISSION,
              },
              {
                label: "Not Authenticated",
                icon: "test-tube",
                path: PATHS.PLATFORM.GENERAL.NOT_AUTHENTICATED,
              },
              {
                label: "Under Construction",
                icon: "test-tube",
                path: PATHS.PLATFORM.GENERAL.UNDER_CONSTRUCTION,
              },
            ],
          },
        ],
      },
      {
        label: "Tester",
        icon: "test-tube",
        path: PATHS.PLATFORM.TESTER.ROOT,
        subNavigation: [
          {
            items: [
              {
                label: "Sub1",
                icon: "test-tube",
                path: PATHS.PLATFORM.TESTER.SUB1,
              },
              {
                label: "Sub2",
                icon: "pdf",
                path: PATHS.PLATFORM.TESTER.SUB2,
              },
              {
                label: "Members",
                icon: "test-tube",
                path: PATHS.PLATFORM.TESTER.MEMBERS,
              },
            ],
          },
        ],
      },      {
        label: "Printer",
        icon: "test-tube",
        path: PATHS.PLATFORM.PRINTER_TEST,
      }
    ],
  },
];


const ROOT_PLATFORM = "/portal";

export const PATHS = {

  AUTH: {
    SIGN_IN: "/sign-in",
    FORGOT_PASSWORD: "/forgot-password",
  },

  PLATFORM: {
    ROOT: ROOT_PLATFORM,

    TEST: {
      ROOT: `${ROOT_PLATFORM}/test`,
      SUB1: `${ROOT_PLATFORM}/test/sub1`,
      SUB2: `${ROOT_PLATFORM}/test/sub2`,
      SUB3: `${ROOT_PLATFORM}/test/sub3`,
      SUB4: `${ROOT_PLATFORM}/test/sub4`,
      SUB5: `${ROOT_PLATFORM}/test/sub5`,
    },

    TEAM: {
      ROOT: `${ROOT_PLATFORM}/team`,
      DETAILS: {
        ROOT: (id: string) => `${ROOT_PLATFORM}/team/${id}`,
      }
    },

    PROFILE: {
      ROOT: `${ROOT_PLATFORM}/profile`,
    },

    SETTINGS: {
      ROOT: `${ROOT_PLATFORM}/settings`,
      CHANGELOG: `${ROOT_PLATFORM}/settings/changelog`,
    },

    COMPONENTS: {
      ROOT:          `${ROOT_PLATFORM}/components`,
      TABLE:         `${ROOT_PLATFORM}/components/table`,
      TABLE_DETAIL:  (id: string) => `${ROOT_PLATFORM}/components/table/${id}`,
      POPUP:         `${ROOT_PLATFORM}/components/popup`,
      TABS:          `${ROOT_PLATFORM}/components/tabs`,
      POPOVER:       `${ROOT_PLATFORM}/components/popover`,
      CALENDAR:      `${ROOT_PLATFORM}/components/calendar`,
      NOTIFICATIONS: `${ROOT_PLATFORM}/components/notifications`,
      CARD_FILE:     `${ROOT_PLATFORM}/components/card-file`,
      INFO_ITEM:     `${ROOT_PLATFORM}/components/info-item`,
      LOGS:          `${ROOT_PLATFORM}/components/logs`,
      ERROR_LOGS:    `${ROOT_PLATFORM}/components/error-logs`,
      MAINTENANCE:   `${ROOT_PLATFORM}/components/maintenance`,
      SNACKBAR:      `${ROOT_PLATFORM}/components/snackbar`,
      EDITOR:        `${ROOT_PLATFORM}/components/editor`,
    },

    GENERAL: {
      ROOT:               `${ROOT_PLATFORM}/general`,
      LOADING:            `${ROOT_PLATFORM}/general/loading`,
      NOT_FOUND:          `${ROOT_PLATFORM}/general/not-found`,
      EMPTY:              `${ROOT_PLATFORM}/general/empty`,
      NO_PERMISSION:      `${ROOT_PLATFORM}/general/no-permission`,
      NOT_AUTHENTICATED:  `${ROOT_PLATFORM}/general/not-authenticated`,
      UNDER_CONSTRUCTION: `${ROOT_PLATFORM}/general/under-construction`,
    },

    TESTER: {
      ROOT: `${ROOT_PLATFORM}/tester`,
      SUB1: `${ROOT_PLATFORM}/tester/sub1`,
      SUB2: `${ROOT_PLATFORM}/tester/sub2`,
      MEMBERS: `${ROOT_PLATFORM}/tester/members`,
      MEMBER_DETAIL: (id: string) => `${ROOT_PLATFORM}/tester/members/${id}`,
    },

    // TEST — remove when not needed
    NOTIFICATIONS_TEST: `${ROOT_PLATFORM}/notifications-test`,
    LOGS_TEST: `${ROOT_PLATFORM}/logs-test`,
    PRINTER_TEST: `${ROOT_PLATFORM}/print-test`
  }

}

export const PATH_AFTER_AUTH = PATHS.PLATFORM.ROOT;

export const PATHS_API = {
  USER: {
    CREATE: "/api/user/create",
    UPDATE: "/api/user/update",
    PASSWORD: "/api/user/password",
    DELETE: "/api/user/delete",
    DISABLE: "/api/user/disable",
  }
}

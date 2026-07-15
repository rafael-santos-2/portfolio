// IMPORTS
// ----------------------------------------------------------------------------------------------------

import { JSX } from "react";
import { IChangelogProps } from "./changelog.type";
import { TChangeCategory } from "@/types/app.type";
import { useTranslate } from "@/providers/language";
import css from "./changelog.module.css";
import { Typography } from "@mui/material";
import { formatDate } from "@/utils/date";


// HELPERS
// ----------------------------------------------------------------------------------------------------
const BADGE_CLASS: Record<TChangeCategory, string> = {
  added: css["badge-added"],
  improved: css["badge-improved"],
  fixed: css["badge-fixed"],
  removed: css["badge-removed"],
  deprecated: css["badge-deprecated"],
  security: css["badge-security"],
  performance: css["badge-performance"],
  breaking: css["badge-breaking"],
};


export default function Changelog({ changelog }: IChangelogProps): JSX.Element {


  // CONFIG
  // ----------------------------------------------------------------------------------------------------
  const { t } = useTranslate();

  const CATEGORY_LABELS: Record<TChangeCategory, string> = {
    added: t("changelog.categories.added"),
    improved: t("changelog.categories.improved"),
    fixed: t("changelog.categories.fixed"),
    removed: t("changelog.categories.removed"),
    deprecated: t("changelog.categories.deprecated"),
    security: t("changelog.categories.security"),
    performance: t("changelog.categories.performance"),
    breaking: t("changelog.categories.breaking"),
  };


  // STATES
  // ----------------------------------------------------------------------------------------------------


  // FUNCTIONS
  // ----------------------------------------------------------------------------------------------------


  // EFFECTS
  // ----------------------------------------------------------------------------------------------------


  // RETURN
  // ----------------------------------------------------------------------------------------------------
  return (

    <div className={css.container}>
      {changelog.map((patch, idx) => (

        <div key={patch.version}>

          <div className={css.version}>

            <div className={css["version-header"]}>
              <Typography variant="h6">v{patch.version}</Typography>
              <span className={css["version-date"]}>{formatDate(patch.date)}</span>
              {patch.title && <span className={css["version-title"]}>— {patch.title}</span>}
            </div>

            <div className={css.changes}>
              {patch.changes.map((change, changeIdx) => (
                <div key={changeIdx} className={css.change}>
                  <span className={BADGE_CLASS[change.category]}>
                    {CATEGORY_LABELS[change.category]}
                  </span>
                  <span>{change.description}</span>
                </div>
              ))}
            </div>

          </div>

          {idx < changelog.length - 1 && <hr className={css.divider} />}

        </div>

      ))}
    </div>

  );


}

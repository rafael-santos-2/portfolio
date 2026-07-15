"use client";

import { JSX } from "react";
import css from "./member-details.module.css";
import { IMemberDetailsProps } from "./member-details.type";
import MemberDetailsGeneral from "./general/member-details-general";
import MemberDetailsInfo from "./info/member-details-info";


export default function MemberDetails({ member }: IMemberDetailsProps): JSX.Element {
  return (
    <div className={css.content}>
      <div className={css.column}>
        <MemberDetailsGeneral member={member} />
      </div>

      <div className={css.column}>
        <MemberDetailsInfo member={member} />
      </div>
    </div>
  );
}

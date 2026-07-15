import { Typography } from "@mui/material";
import css from "./view-empty.module.css";
import { IViewEmptyProps } from "./view-empty.type";


function DefaultIcon() {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="12" y="8" width="40" height="48" rx="4" stroke="currentColor" strokeWidth="2" strokeDasharray="4 3" />
      <line x1="22" y1="22" x2="42" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      <line x1="22" y1="30" x2="38" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.35" />
      <line x1="22" y1="38" x2="34" y2="38" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.2" />
    </svg>
  );
}


export default function ViewEmpty({ title, description, icon, actions }: IViewEmptyProps) {

  return (
    <div className={css.container}>

      <span className={css.icon}>{icon ?? <DefaultIcon />}</span>

      {title && (
        <Typography variant="subtitle1" fontWeight={600} color="textSecondary">
          {title}
        </Typography>
      )}

      {description && (
        <Typography variant="body2" color="textDisabled" className={css.description}>
          {description}
        </Typography>
      )}

      {actions && <div className={css.actions}>{actions}</div>}

    </div>
  );

}

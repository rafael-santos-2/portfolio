import { IFirestoreDefault } from "./firestore-default.type";

export type TErrorLogType = 'unhandled_exception' | 'unhandled_rejection' | 'react_boundary' | 'manual';

export interface IErrorLog extends IFirestoreDefault {
  error_type:        TErrorLogType;
  error_name:        string;
  error_message:     string;
  error_stack:       string | null;
  component_stack:   string | null;
  fingerprint:       string;
  count:             number;
  date_last_seen:    Date;
  route:             string | null;
  url:               string | null;
  user_agent:        string | null;
  platform:          string | null;
  screen_resolution: string | null;
  viewport:          string | null;
  language:          string | null;
  is_online:         boolean | null;
  environment:       string | null;
  app_version:       string | null;
  user_id:           string | null;
  user_email:        string | null;
  metadata:          Record<string, unknown> | null;
}

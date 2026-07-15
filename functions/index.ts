// IMPORTS
// ---------------------------------------------------------------------------------------
import * as admin from "firebase-admin";
import * as functions from "firebase-functions/v2";
import { REGION } from "./config/global";


// GLOBAL
// ---------------------------------------------------------------------------------------
admin.initializeApp();
functions.setGlobalOptions({ region: REGION });


// IMPORT CALLS
// ---------------------------------------------------------------------------------------


// IMPORT JOBS
// ---------------------------------------------------------------------------------------


// IMPORT TRIGGERS
// ---------------------------------------------------------------------------------------
import * as triggers_user_notification from "./triggers/user/notification";


// EXPORT CALLS
// ---------------------------------------------------------------------------------------


// EXPORT JOBS
// ---------------------------------------------------------------------------------------


// EXPORT TRIGGERS
// ---------------------------------------------------------------------------------------
exports.user_notification = triggers_user_notification;
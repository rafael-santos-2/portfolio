import { AUTH, FIRESTORE, STORAGE } from "@/config/firebase/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST( request: NextRequest ) {
  try {

    // PARSE
    // ----------------------------------------------------------------------------------------------------
    const BODY = await request.json();
    const AUTH_HEADER = request.headers.get("Authorization");
    const TOKEN = AUTH_HEADER?.startsWith("Bearer ") ? AUTH_HEADER.slice(7) : null;
    const ID: string | null = BODY?.id || null;


    // AUTH
    // ----------------------------------------------------------------------------------------------------
    if ( !TOKEN ) { return NextResponse.json({ error: "No auth token provided." }, { status: 401 }); }
    if ( !ID ) { return NextResponse.json({ error: "No user id provided." }, { status: 400 }); }

    const AUTH_VERIFY = await AUTH.verifyIdToken(TOKEN);
    const AUTH_USER = await AUTH.getUser(AUTH_VERIFY.uid);
    const AUTH_USER_ROLE = AUTH_USER.customClaims?.role || null;

    // Only allow admins/developers or the user themselves
    if ( !["Admin", "Developer"].includes(AUTH_USER_ROLE) && AUTH_USER.uid !== ID ) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }


    // GET CURRENT USER
    // ----------------------------------------------------------------------------------------------------
    const REF_USER = FIRESTORE.collection("users").doc(ID);
    const USER_SNAP = await REF_USER.get();

    if ( !USER_SNAP.exists ) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    const USER = USER_SNAP.data()!;


    // DATA
    // ----------------------------------------------------------------------------------------------------
    const EMAIL: string | null = BODY?.email || null;
    const FIRSTNAME: string | null = BODY?.firstName || null;
    const LASTNAME: string | null = BODY?.lastName || null;
    const IMAGE: { base64: string; name: string; type: string } | null = BODY?.image || null;
    const AVATAR_CLEARED = BODY?.path_avatar === null && USER?.path_avatar;
    const LAST_SEEN_VERSION: string | null = BODY?.last_seen_version ?? null;


    // HANDLE EMAIL
    // ----------------------------------------------------------------------------------------------------
    if ( EMAIL && EMAIL !== USER?.email ) {

      // Check uniqueness
      const existing = await FIRESTORE
        .collection("users")
        .where("email", "==", EMAIL)
        .where("is_deleted", "==", false)
        .count()
        .get();

      if ( existing.data().count > 0 ) {
        return NextResponse.json({ error: "Email already exists." }, { status: 409 });
      }

      await AUTH.updateUser(ID, { email: EMAIL });
    }


    // HANDLE AVATAR
    // ----------------------------------------------------------------------------------------------------
    let avatarPath: string | null = USER?.path_avatar || null;

    // Delete old avatar if it exists and a new one is uploaded or avatar is cleared
    if ( (IMAGE || AVATAR_CLEARED) && USER?.path_avatar ) {
      const oldFilePath = USER.path_avatar.replace(`gs://${STORAGE.name}/`, "");
      await STORAGE.file(oldFilePath).delete().catch(() => {});
    }

    if ( IMAGE ) {
      // Upload new avatar
      const buffer = Buffer.from(IMAGE.base64, "base64");
      const filePath = `users/${ID}/avatar/${IMAGE.name}`;
      const file = STORAGE.file(filePath);

      await file.save(buffer, {
        public: true,
        metadata: { contentType: IMAGE.type },
      });

      avatarPath = file.cloudStorageURI.href;

    } else if ( AVATAR_CLEARED ) {
      avatarPath = null;
    }


    // UPDATE AUTH DISPLAY NAME
    // ----------------------------------------------------------------------------------------------------
    const resolvedFirstName = FIRSTNAME || USER?.firstName || "";
    const resolvedLastName = LASTNAME || USER?.lastName || "";
    const displayName = `${resolvedFirstName} ${resolvedLastName}`.trim() || undefined;

    await AUTH.updateUser(ID, { displayName });


    // UPDATE FIRESTORE
    // ----------------------------------------------------------------------------------------------------
    const DATA = {
      firstName: FIRSTNAME || USER?.firstName,
      lastName: LASTNAME || USER?.lastName,
      email: EMAIL || USER?.email,
      path_avatar: avatarPath,
      ...(LAST_SEEN_VERSION !== null ? { last_seen_version: LAST_SEEN_VERSION } : {}),
      date_updated: new Date(),
      id_updater: AUTH_USER.uid,
    }
    await REF_USER.update(DATA);


    return NextResponse.json({ message: "User has been updated." , data:DATA }, { status: 200 });

  } catch (error) {

    console.error("[API] (user/update) Error:", error);
    return NextResponse.json({ error: "Failed to update user." }, { status: 500 });

  }
}

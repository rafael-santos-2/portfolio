import { AUTH, FIRESTORE, STORAGE } from "@/config/firebase/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST( request: NextRequest ): Promise<Response> {
  try {

    // PARSE
    // ----------------------------------------------------------------------------------------------------
    const BODY = await request.json();
    const AUTH_HEADER = request.headers.get("Authorization");
    const TOKEN = AUTH_HEADER?.startsWith("Bearer ") ? AUTH_HEADER.slice(7) : null;


    // AUTH
    // ----------------------------------------------------------------------------------------------------
    if ( !TOKEN ) { return NextResponse.json({ error: "No auth token provided." }, { status: 401 }); }

    const AUTH_VERIFY = await AUTH.verifyIdToken(TOKEN);
    const AUTH_USER = await AUTH.getUser(AUTH_VERIFY.uid);
    const AUTH_USER_ROLE = AUTH_USER.customClaims?.role || null;

    if ( !["Admin", "Developer"].includes(AUTH_USER_ROLE) ) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }


    // DATA
    // ----------------------------------------------------------------------------------------------------
    const EMAIL: string | null = BODY?.email || null;
    const PASSWORD: string | null = BODY?.password || null;
    const FIRSTNAME: string | null = BODY?.firstName || null;
    const LASTNAME: string | null = BODY?.lastName || null;
    const ROLE: string | null = BODY?.role || null;
    const IMAGE: { base64: string; name: string; type: string } | null = BODY?.image || null;

    if ( !EMAIL ) { return NextResponse.json({ error: "No email provided." }, { status: 400 }); }
    if ( !PASSWORD ) { return NextResponse.json({ error: "No password provided." }, { status: 400 }); }


    // CHECK EMAIL UNIQUENESS
    // ----------------------------------------------------------------------------------------------------
    const existing = await FIRESTORE
      .collection("users")
      .where("email", "==", EMAIL)
      .where("is_deleted", "==", false)
      .count()
      .get();

    if ( existing.data().count > 0 ) {
      return NextResponse.json({ error: "EMAIL_EXISTS" }, { status: 409 });
    }


    // NEW USER REF
    // ----------------------------------------------------------------------------------------------------
    const REF_USER = FIRESTORE.collection("users").doc();


    // HANDLE AVATAR
    // ----------------------------------------------------------------------------------------------------
    let avatarPath: string | null = null;

    if ( IMAGE?.base64 ) {
      const buffer = Buffer.from(IMAGE.base64, "base64");
      const filePath = `users/${REF_USER.id}/avatar/${IMAGE.name}`;
      const file = STORAGE.file(filePath);
      await file.save(buffer, { public: true, metadata: { contentType: IMAGE.type } });
      avatarPath = file.cloudStorageURI.href;
    }


    // CREATE FIRESTORE DOC
    // ----------------------------------------------------------------------------------------------------
    const DATA = {
      id: REF_USER.id,
      firstName: FIRSTNAME,
      lastName: LASTNAME,
      email: EMAIL,
      role: ROLE,
      path_avatar: avatarPath,

      is_disabled: false,
      date_disabled: null,

      last_seen_version: process.env.NEXT_PUBLIC_VERSION ?? null,

      date_created: new Date(),
      date_updated: null,
      id_creator: AUTH_USER.uid,
      id_updater: null,
      id_deleter: null,
      date_deleted: null,
      is_deleted: false,
    }
    await REF_USER.set(DATA);


    // CREATE AUTH USER
    // ----------------------------------------------------------------------------------------------------
    const NEW_AUTH_USER = await AUTH.createUser({
      uid: REF_USER.id,
      email: EMAIL,
      password: PASSWORD,
      emailVerified: false,
      disabled: false,
      displayName: `${FIRSTNAME || ""} ${LASTNAME || ""}`.trim(),
    });

    await AUTH.setCustomUserClaims(NEW_AUTH_USER.uid, {
      role: ROLE,
      idDatabase: process.env.NEXT_PUBLIC_FIRESTORE,
    });


    return NextResponse.json({ message: "User has been created." , data:DATA }, { status: 200 });

  } catch (error) {

    console.error("[API] (user/create) Error:", error);
    return NextResponse.json({ error: "Failed to create user." }, { status: 500 });

  }
}

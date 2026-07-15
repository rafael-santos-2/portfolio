import { AUTH, FIRESTORE } from "@/config/firebase/server";
import { NextRequest, NextResponse } from "next/server";



export async function POST( request: NextRequest ): Promise<Response> {
  try {

    // PARSE
    // ----------------------------------------------------------------------------------------------------
    const BODY = await request.json();
    const AUTH_HEADER = request.headers.get("Authorization");
    const TOKEN = AUTH_HEADER?.startsWith("Bearer ") ? AUTH_HEADER.slice(7) : null;
    const ID: string | null = BODY?.id || null;
    const DISABLE: boolean = BODY?.disable ?? true;


    // AUTH
    // ----------------------------------------------------------------------------------------------------
    if ( !TOKEN ) { return NextResponse.json({ error: "No auth token provided." }, { status: 401 }); }
    if ( !ID ) { return NextResponse.json({ error: "No user id provided." }, { status: 400 }); }

    const AUTH_VERIFY = await AUTH.verifyIdToken(TOKEN);
    const AUTH_USER = await AUTH.getUser(AUTH_VERIFY.uid);
    const AUTH_USER_ROLE = AUTH_USER.customClaims?.role || null;

    if ( !["Admin", "Developer"].includes(AUTH_USER_ROLE) ) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }


    // USER
    // ----------------------------------------------------------------------------------------------------
    const REF_USER = FIRESTORE.collection("users").doc(ID);
    const USER_SNAP = await REF_USER.get();

    if ( !USER_SNAP.exists ) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }


    // DISABLE / ENABLE
    // ----------------------------------------------------------------------------------------------------
    await AUTH.updateUser(ID, { disabled: DISABLE });

    await REF_USER.update({
      is_disabled: DISABLE,
      date_disabled: DISABLE ? new Date() : null,
    });


    return NextResponse.json({ message: DISABLE ? "User has been disabled." : "User has been enabled." }, { status: 200 });

  } catch (error) {

    console.error("[API] (user/disable) Error:", error);
    return NextResponse.json({ error: "Failed to update user status." }, { status: 500 });

  }
}

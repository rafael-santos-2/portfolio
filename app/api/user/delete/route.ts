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


    // SOFT DELETE
    // ----------------------------------------------------------------------------------------------------
    await AUTH.updateUser(ID, { disabled: true });

    await REF_USER.update({
      is_deleted: true,
      date_deleted: new Date(),
      id_deleter: AUTH_USER.uid,
    });


    return NextResponse.json({ message: "User has been deleted." }, { status: 200 });

  } catch (error) {

    console.error("[API] (user/delete) Error:", error);
    return NextResponse.json({ error: "Failed to delete user." }, { status: 500 });

  }
}

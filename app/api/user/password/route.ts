import { AUTH } from "@/config/firebase/server";
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

    if ( !["Admin", "Developer"].includes(AUTH_USER_ROLE) && AUTH_USER.uid !== ID ) {
      return NextResponse.json({ error: "Unauthorized." }, { status: 403 });
    }


    // PASSWORD
    // ----------------------------------------------------------------------------------------------------
    const PASSWORD: string | null = BODY?.password || null;

    if ( !PASSWORD ) { return NextResponse.json({ error: "No password provided." }, { status: 400 }); }
    if ( PASSWORD.length < 8 ) { return NextResponse.json({ error: "Password must be at least 8 characters long." }, { status: 400 }); }
    if ( !/[a-z]/.test(PASSWORD) ) { return NextResponse.json({ error: "Password must contain at least one lowercase letter." }, { status: 400 }); }
    if ( !/[A-Z]/.test(PASSWORD) ) { return NextResponse.json({ error: "Password must contain at least one uppercase letter." }, { status: 400 }); }
    if ( !/[0-9]/.test(PASSWORD) ) { return NextResponse.json({ error: "Password must contain at least one number." }, { status: 400 }); }
    if ( !/[^A-Za-z0-9]/.test(PASSWORD) ) { return NextResponse.json({ error: "Password must contain at least one special character." }, { status: 400 }); }

    await AUTH.updateUser(ID, { password: PASSWORD });


    return NextResponse.json({ message: "User password has been updated." }, { status: 200 });

  } catch (error) {

    console.error("[API] (user/password) Error:", error);
    return NextResponse.json({ error: "Failed to update user password." }, { status: 500 });

  }
}

import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

import { JwtUserPayload } from "@/interfaces";


export async function POST( request: Request ) {
  try {
    const userData: JwtUserPayload = await request.json();

    const token = jwt.sign(
      {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
      },
      process.env.NEXT_PUBLIC_JWT_SECRET || "",
      { expiresIn: "1h" },
    );

    const backendUrl = `${ process.env.NEXT_PUBLIC_BACKEND }/auth/validate-token`;

    const respuesta = await fetch( backendUrl, {
      body: JSON.stringify( { token } ),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    } );

    const validacion = await respuesta.json();

    return NextResponse.json( {
      token,
      expiresIn: 3600,
      validacion,
    } );
  } catch ( error ) {
    console.error( "Token generation error:", error );

    return NextResponse.json(
      {
        details: error,
        error: "Token generation failed",
      },
      { status: 500 },
    );
  }
}

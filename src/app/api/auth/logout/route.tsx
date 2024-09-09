import { NextRequest, NextResponse } from "next/server";

export async function GET (req: NextRequest) {
  
  const response = NextResponse.json({message: 'Logged out succsessfully'}, {status: 200}) 

  response.cookies.set('token', '', {
    httpOnly: true,
    expires: new Date(0),
    path: '/'
  })

  return response;
}
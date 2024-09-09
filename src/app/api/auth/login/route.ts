import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "../../../lib/mongoose";
import bcrypt from 'bcryptjs'
import { loginSchema } from "../../../schema/authSchema";
import jwt from 'jsonwebtoken';
import User from "../../../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

//login
export async function POST(req:NextRequest) {

  if (req.method !== 'POST') {
    return NextResponse.json({message: 'Invalid method'}, {status: 405})
  }

  try {

    await connectToDB();

    const body = await req.json()
    const { email, password } = loginSchema.parse(body)

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({message: 'Invalid credentials'}, {status: 400})
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    if (!checkPassword) {
      return NextResponse.json({message: 'Invalid password'}, {status: 400})
    }

    const token = jwt.sign({userId: user._id}, JWT_SECRET, {expiresIn: '1h'})

    return NextResponse.json({token}, {status: 200})

  }
  catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({message: 'Unable to verify user credentials', error: errorMessage}, {status: 500})
  }
  
}
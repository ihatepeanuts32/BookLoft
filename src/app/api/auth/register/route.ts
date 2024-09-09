import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import { registerSchema } from '../../../schema/authSchema';
import { connectToDB } from '../../../lib/mongoose';

//register route
export async function POST (req: NextRequest) {

  if (req.method !== 'POST') {
    return NextResponse.json({message: 'Invalid method'}, {status: 405})
  }

    try {
      await connectToDB();

      const body = await req.json();
      const { username, email, password } =  registerSchema.parse(body);

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json({message: 'User already exists'}, {status: 400})
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        username,
        email,
        password: hashedPassword
      })

      await newUser.save()

      return NextResponse.json({message: 'User created succesfully'}, {status: 201})

    }
    catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      return NextResponse.json({message: 'Unable to create user', error: errorMessage}, {status: 500})
    }
}


import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse,NextRequest } from "next/server";

export const GET=async(req:Request, res:Response) => {
  try {
    console.log("GET");
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate('creator');
   
    return new Response(JSON.stringify(prompts), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    console.error(error);
   return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500
    });
  }
}

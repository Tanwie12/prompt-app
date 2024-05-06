import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse,NextRequest } from "next/server";

export const GET=async(req:Request, {params}:{params:{id:string}}) => {
  try {
    console.log('hey')
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate('creator');
   
    return new Response(JSON.stringify(prompt), {
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
// PATCH (update)
export const PATCH=async(req:Request, {params}:{params:{id:string}}) => {
  try {
    console.log('this the all prompt')
    await connectToDatabase();
    const prompt = await Prompt.findById(params.id).populate('creator');
    const body = await req.json();
    prompt.prompt = body.prompt;
    prompt.tag = body.tags;
    prompt.save();
    return new Response(JSON.stringify(prompt), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  }catch (error) {
    console.error(error);
   return new Response(JSON.stringify({ error: 'faled to update prompt' }), {
      status: 500
    });
  }
}

//delete Route
// DELETE Route
export const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
  try {
    console.log('this the delete route');
    await connectToDatabase();
    
    // Find the prompt by ID
    const prompt = await Prompt.findById(params.id).populate('creator');
    console.log(prompt)

    // Check if prompt exists
    if (!prompt) {
      return new Response(JSON.stringify({ error: 'Prompt not found' }), {
        status: 404
      });
    }

    // Remove the prompt
   // Convert the prompt to a plain JavaScript object
   const promptObject = prompt.toObject();

   // Remove the prompt using the _id property
   await Prompt.deleteOne({ _id: promptObject._id });

    return new Response("Prompt deleted", {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to delete prompt' }), {
      status: 500
    });
  }
};



  
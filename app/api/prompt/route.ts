import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";


export const GET=async(request:any) => {
  try {
    console.log('this users all prompt')
    await connectToDatabase();
    const prompts = await Prompt.find({}).populate('creator')
   
    return new Response(JSON.stringify(prompts), {
     
      status: 200,
    });
  } catch (error) {
   
   return new Response(JSON.stringify({ error: 'Something went wrong' }), {
      status: 500
    });
  }
}

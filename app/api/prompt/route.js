import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";


export const GET=async() => {
  try {
    console.log('this the all prompt')
    await connectToDatabase();
    const prompts = await Prompt.findAll({}).populate('creator');
   
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
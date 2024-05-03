import { connectToDatabase } from "@utils/databse";
import Prompt from "@models/prompt";
export const Post=async(req)=>{
    const {userId, prompt,tags}=await req.json();
    try{
        await connectToDatabase()
        const newPrompt=new Prompt({
            prompt,
            creator:userId,
            tags
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt))
    }catch(err){
        console.log(err)
    }
}
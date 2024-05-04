import { connectToDatabase } from "@utils/database";
import Prompt from "@models/prompt";
export const POST=async(req)=>{
    const {userId, prompt,tags}=await req.json();
    try{
        await connectToDatabase()
        
        const newPrompt=new Prompt({
            prompt,
            creator:userId,
            tag:tags
        })
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt),{status:200})
    }catch(err){
        console.log(err)
        return new Response("Error creating prompt", {status:500})
    }
}

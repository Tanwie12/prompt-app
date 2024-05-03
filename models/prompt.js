import { Schema,model,models } from "mongoose";


const PromptSchema = new Schema({
    prompt: {
        type: String,
        required: [true, 'Prompt is required']
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tag:{
        type: String,
        required:[true,'Tag is required']
    }
    
})
PromptSchema.set('timestamps',true)
const Prompt = models.Prompt || model("Prompt", PromptSchema);
export default Prompt;
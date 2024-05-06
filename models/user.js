// createing a model schema for user 
import { models, Schema,model } from "mongoose";


//user schema
const userSchema = new Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image:{
        type: String,
    }
    // password: {
    //     type: String,
    //     required: true,
    //     match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,"user name must contain at least one uppercase, lowercase, number and special character"],
    // },
    // isAdmin: {
    //     type: Boolean,
    //     required: true,
    //     default: false,
    // },
},
 {
    timestamps: true,
});
const User = models.User || model("User", userSchema);
export default User;


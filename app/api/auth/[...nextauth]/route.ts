import { connectToDatabase } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import User from "@models/user";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),

  ],
  callbacks:{

  

  async session({session}){
    const sessionUser = await User.findOne({email: session.user.email});
    console.log(session.user)
    session.user.id = sessionUser._id; // Corrected method name is toString()
console.log(session.user.id+"the session id")
    return session;
    
   
  },
  /**
   * Handles the sign-in process for a user.
   *
   * If the user exists in the database, it retrieves the user's information.
   * If the user does not exist, it creates a new user in the database with the provided user information.
   *
   * @param {object} user - The user's user information, including name, email, and picture.
   * @returns {boolean} error - Returns false if an error occurs during the sign-in process.
   */
    async signIn({ user }: any): Promise<boolean> {
      const isAllowedToSignIn = true;
      console.log(user);

      const username =
        user && user.name
          ? user.name.replace(" ", "").toLowerCase()
          : "defaultUsername";
      try {
        await connectToDatabase();
        // if user exist
        const users = await User.findOne({ email: user.email });

        //if not, create new user
        if (!users) {
          await User.create({
            username: username,
            email: user.email,
            image: user.image,
          });
        }
      } catch (error) {
        console.log(error);
        return false;
      }
      return isAllowedToSignIn;
    },
}
});
export {handler as GET, handler as POST}
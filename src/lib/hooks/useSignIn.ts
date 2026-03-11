import { authClient } from "@/lib/auth-client";

export const useGoogleSignIn=async ()=>{
   try{
      const response = await authClient.signIn.social({
         provider:"google",
         callbackURL:"/dashboard"
      })
      return {
         response,success:true,
      }
   }catch(err){
      return {
         success:false,
         message:"Something went wrong"
      }
   }
}
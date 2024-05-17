import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { GOOGLE_OAUTH } from "@/utils/envExporter";

export const authOptions = {
  // Configure one or more authentication providers
    providers: [
        GoogleProvider({
            clientId: GOOGLE_OAUTH.GOOGLE_CLIENT_ID as string,
            clientSecret: GOOGLE_OAUTH.GOOGLE_SECRET as string,
        }),
        // ...add more providers here
    ],
}

export default NextAuth(authOptions)
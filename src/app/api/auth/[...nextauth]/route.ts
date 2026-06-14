import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        await dbConnect();
        let dbUser = await User.findOne({ email: user.email });
        
        const adminEmails = [
          "david.artavia.rodriguez@gmail.com",
          "caravisalazar@gmail.com"
        ];
        const isAdmin = adminEmails.includes(user.email.toLowerCase());

        if (!dbUser) {
          dbUser = await User.create({
            name: user.name || "Usuario Google",
            email: user.email,
            image: user.image || "",
            role: isAdmin ? "admin" : "user",
            status: isAdmin ? "approved" : "pending",
          });
        } else if (isAdmin && (dbUser.role !== "admin" || dbUser.status !== "approved")) {
          // Si el usuario ya existe pero ahora está en la lista de administradores,
          // lo actualizamos automáticamente a administrador aprobado en la base de datos.
          dbUser.role = "admin";
          dbUser.status = "approved";
          await dbUser.save();
        }
        return true;
      } catch (error) {
        console.error("Error in NextAuth signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      try {
        await dbConnect();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
          token.status = dbUser.status;
        }
      } catch (error) {
        console.error("Error in NextAuth jwt callback:", error);
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

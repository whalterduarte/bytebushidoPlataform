import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthUser } from "../../../types/AuthUser";

// Configurações de Autenticação
const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: { label: "E-mail", type: "text" },
        password: { label: "Senha", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await fetch(`https://api-byte.vercel.app/login`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          if (response.ok) {
            const user = await response.json();

            if (user) {
              return user;
            }
          }
        } catch (error) {
          console.error("Erro durante a autenticação:", error);
        }

        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && token.user) {
        session.user = token.user as AuthUser;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

// Inicialização do NextAuth com as opções configuradas
export default NextAuth(authOptions);

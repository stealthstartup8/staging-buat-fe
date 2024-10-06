import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export default NextAuth({
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				try {
					const response = await axios.post(process.env.NEXT_PUBLIC_API_KEY + "/auth/login", {
						email: credentials?.email,
						password: credentials?.password,
					});
					const user = response.data;
					if (user) {
						return user;
					} else {
						return null;
					}
				} catch (error) {
					throw new Error(error.response.data.error);
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			if (Date.now() > token.data?.exp * 1000) {
				await NextAuth.destroyToken(token);
			}

			if (trigger === "update") {
				return { ...token, ...session.user };
			}

			return { ...token, ...user };
		},
		async session({ session, token }) {
			session.user = token;
			return session;
		},
	},
	session: {
		jwt: true,
		maxAge: 60 * 24 * 60 * 7, // 7 Days
	},
	pages: {
		signIn: "/login",
	},
	secret: process.env.NEXTAUTH_SECRET,
});

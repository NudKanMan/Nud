import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Ensure email is always a string
        if (!credentials?.email || !credentials?.password) {
          return null; // If email or password is missing, reject
        }

        const user = {
          id: '1',
          name: 'Mia Khalifa',
          email: credentials.email, // Now guaranteed to be a string
        };

        // Example authentication logic
        if (credentials.email === '6431234321@student.chula.ac.th' && credentials.password === 'P@ssw0rd!') {
          return user; // Return the user object on successful authentication
        } else {
          return null; // Return null if the credentials are incorrect
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.id = token.id;
      session.email = token.email;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
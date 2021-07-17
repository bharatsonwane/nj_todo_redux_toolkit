import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { generateUsersDataPath, extractUsersData, hashPassword, handleGetUserDataObject, verifyPassword } from 'server/utils/userUtils'


export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      async authorize(credentials) {

        const filePath = generateUsersDataPath();
        const data = extractUsersData(filePath);
        let userDataObject = await handleGetUserDataObject(credentials.email, data)

        let isValid
        if (userDataObject) {
          isValid = await verifyPassword(credentials.password, userDataObject.password);
        }
        else {
          throw new Error('No user found!');
        }
        if (isValid) {
          return { email: credentials.email };
        }
        else {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});

import '@/styles/globals.css';
import { AuthProvider } from '../context/AuthProvider';
import { UserProvider } from '../context/userContext';
import {SessionProvider} from "next-auth/react"

export default function App({ Component, pageProps ,session}) {
  return (
    
    <AuthProvider>
      <UserProvider>
<SessionProvider session={session}>

      <Component {...pageProps} />
</SessionProvider>
      </UserProvider>
    </AuthProvider>
  );
}

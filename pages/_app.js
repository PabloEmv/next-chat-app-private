import "@/styles/globals.css";
import { AuthProvider } from "@/contexts/authContext";
import { ChatContextProvider } from "@/contexts/chatContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChatContextProvider>
        <Component {...pageProps} />
      </ChatContextProvider>
    </AuthProvider>
  );
}

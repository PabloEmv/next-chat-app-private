import Chats from "@/components/Chats";
import Navbar from "@/components/Navbar";
import ChatConversation from "@/components/ChatConversation";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import Loading from "@/components/Loading";

export default function Chat() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <Loading />;
  if (!user) {
    router.push("/");
    return null;
  }

  return (
    <main className="chat-screen">
      <section className="chatInterface chat-template">
        <Navbar />
        <Chats />
        <ChatConversation />
      </section>
    </main>
  );
}

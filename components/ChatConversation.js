import styles from "./chatconversation.module.css";
import { useContext } from "react";
import { ChatContext } from "@/contexts/chatContext";
import Input from "./Input";

export default function ChatConversation() {
  const { data } = useContext(ChatContext);

  return (
    <section className={styles.chat}>
      <nav className={styles.top_bar}>
        <span>{data.user.displayName}</span>
      </nav>
      <section className={styles.chat_conversation}>
        <section className={styles.conversation}>
          {/*           <div style={{ display: "flex", gap: "10px" }}>
            <img
              src="https://picsum.photos/50"
              alt="imagen de usuario"
              className="user-img"
            />
            <section className={styles.conversation_messages}>
              <p className={styles.single_message}>hola como estas?</p>
              <p className={styles.single_message}>jdsjfjsjfs</p>
              <p className={styles.single_message}>
                aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaAAAAAAAA
              </p>
            </section>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              gap: "10px",
            }}
          >
            <div>
              <img
                src="https://picsum.photos/50"
                alt="imagen de usuario"
                className="user-img"
              />
            </div>
            <section
              className={`${styles.conversation_messages} ${styles.owner_messages_container}`}
            >
              <p className={`${styles.single_message} ${styles.owner_message}`}>
                bien y tu?
              </p>
              <p className={`${styles.single_message} ${styles.owner_message}`}>
                jdsjssddfjsjfs
              </p>
              <p className={`${styles.single_message} ${styles.owner_message}`}>
                xdxdxdxdxdxdxdxdxx xdxdxdxdxdxdxdxdxx xdxdxdxdxdxdxdxdxx
                xdxdxdxdxdxdxdxdxx xdxdxdxdxdxdxdxdxx
              </p>
              <img
                src="https://picsum.photos/1000"
                alt="imagen"
                className={`${styles.single_message} ${styles.owner_message}`}
              />
            </section>
          </div> */}
        </section>
        <Input />
      </section>
    </section>
  );
}

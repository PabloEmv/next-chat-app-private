import styles from "./chatuser.module.css";
import { useEffect, useState } from "react";

export default function ChatUser({ userimage, username, lastmessage }) {
  const [previewUrl, setPreviewUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/chat-app-8f2a5.appspot.com/o/default-user.png?alt=media&token=62828855-85c5-422b-bac1-5d40a9805a8a"
  );

  useEffect(() => {
    if (userimage != null) {
      setPreviewUrl(userimage);
    }
  }, [userimage]);
  return (
    <div className={styles.chat_user}>
      <img src={previewUrl} alt="imagen de usuario" className="user-img" />
      <div className={styles.chat_user_info}>
        <span style={{ display: "inline" }}>{username}</span>
        <p className={styles.preview_message}>{lastmessage}</p>
      </div>
    </div>
  );
}

import styles from "./userfriend.module.css";

export default function UserFriend({ username, isFollowing = null }) {
  return (
    <div className={styles.user_friend_card}>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <img
            src="https://picsum.photos/50"
            alt="imagen de usuario"
            style={{
              width: "60px",
              heidth: "60px",
              borderRadius: "50%",
              content: "center",
              border: "4px solid #ccc",
            }}
          />
          <span style={{ margin: 0 }}>{username}</span>
        </div>
      </div>
      <div style={{ display: "grid", alignItems: "center" }}>
        <ButtonFollow isFollowing={isFollowing} />
      </div>
    </div>
  );
}

import ButtonFollow from "./ButtonFollow";

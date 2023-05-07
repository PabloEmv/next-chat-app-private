import Image from "next/image";
import ChatUser from "./ChatUser";
import newChatImg from "../public/plus-circle.svg";
import styles from "./chats.module.css";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useAuth } from "@/contexts/authContext";
import { ChatContext } from "@/contexts/chatContext";

export default function Chats() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
  const [chats, setChats] = useState([]);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const q = query(collection(db, "users"), where("uid", "!=", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users = snapshot.docs.map((doc) => doc.data());
      setUsers(users);
    });

    return unsubscribe;
  }, [user.uid]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  const handleSelect = async (selectedUser) => {
    const combinedId =
      user.uid > selectedUser.uid
        ? user.uid + selectedUser.uid
        : selectedUser.uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(combinedId);

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await dispatch({ type: "CHANGE_USER", payload: selectedUser });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <aside className={styles.chats}>
      <section className={styles.chats_tile}>
        <h2 style={{ margin: "0" }}>Chats</h2>
      </section>
      <section className={styles.chats_users}>
        {users.map((user) => {
          return (
            <div key={user.uid} onClick={() => handleSelect(user)}>
              <ChatUser
                userimage={user.photoURL}
                username={user.displayName}
                /* lastmessage={user.message} */
              />
            </div>
          );
        })}
      </section>
    </aside>
  );
}

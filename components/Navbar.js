import inboxImg from "../public/inbox.svg";
import contactsImg from "../public/contacts.svg";
import configImg from "../public/config.svg";
import logOutImg from "../public/logout.svg";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./navbar.module.css";
import { useAuth } from "@/contexts/authContext";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const [previewUrl, setPreviewUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/chat-app-8f2a5.appspot.com/o/default-user.png?alt=media&token=62828855-85c5-422b-bac1-5d40a9805a8a"
  );
  const router = useRouter();
  const { logout } = useAuth();
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user && user.photoURL) {
      setPreviewUrl(user.photoURL.toString());
    }
  }, [user]);
  return (
    <nav className={styles.sidebar}>
      <section>
        <div className={styles.profile_image}>
          <img src={previewUrl} alt="imagen de usuario" />
        </div>
        {/* <Image
            src={userImg}
            alt="logo de chagt"
            className={styles.logo_chagt}
            width={80}
            height={80}
          /> */}
        <ul>
          <Link href="/chat">
            <li
              className={router.pathname === "/chat" ? styles.active_page : ""}
            >
              <Image src={inboxImg} alt="inbox" width={30} height={30} />
            </li>
          </Link>
          <li
            className={router.pathname === "/config" ? styles.active_page : ""}
          >
            <Link href="/config">
              <Image
                src={configImg}
                alt="configuración"
                width={30}
                height={30}
              />
            </Link>
          </li>
        </ul>
      </section>
      <button className={styles.logout_button} onClick={handleLogout}>
        <Image src={logOutImg} alt="cerrar sesion" width={30} height={30} />
      </button>
    </nav>
  );
}

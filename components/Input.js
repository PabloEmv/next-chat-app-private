import Image from "next/image";
import styles from "./chatconversation.module.css";
import sendImg from "../public/send.svg";

export default function Input() {
  return (
    <section className={styles.message}>
      <input type="text" />
      <button className={styles.send_button}>
        <Image src={sendImg} alt="enviar" width={30} height={30} />
      </button>
    </section>
  );
}

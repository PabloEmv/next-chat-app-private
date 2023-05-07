import { useAuth } from "@/contexts/authContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import logo from "../public/logo.png";
import styles from "../components/authform.module.css";
import Loading from "@/components/Loading";
import { db } from "@/firebase";
import { doc, setDoc } from "firebase/firestore";

export default function Register() {
  const [userAuth, setUserAuth] = useState({
    email: "",
    password: "",
  });

  const { signup } = useAuth();
  const router = useRouter();
  const [error, setError] = useState();

  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user) {
    router.push("/config");
    return null;
  }

  const handleChange = ({ target: { name, value } }) => {
    setUserAuth({ ...userAuth, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { user } = await signup(userAuth.email, userAuth.password);
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      await setDoc(doc(db, "userChats", user.uid), {});
      router.push("/chat");
    } catch (error) {
      console.log(error.code); // para ver el tipo de error
      if (
        error.code === "auth/internal-error" ||
        error.code === "auth/invalid-email" ||
        error.code === "auth/email-already-in-use"
      ) {
        setError("correo inválido");
      } else if (error.code === "auth/weak-password") {
        setError("la contraseña debe tener al menos 6 caracteres");
      }

      // setError(error.message)
    }
  };

  return (
    <main className={styles.auth_form}>
      <div>
        <div style={{ textAlign: "center" }}>
          <Link href="/">
            <Image
              src={logo}
              alt="logo de chagt"
              width={120}
              height={120}
              className={styles.logochagt}
            />
          </Link>
        </div>
        <form onSubmit={handleSubmit} className={styles.form_container}>
          <h1 style={{ textAlign: "center", margin: "0" }}>Regístrate</h1>
          <p style={{ textAlign: "center", margin: "0 0 25px 0" }}>
            ¿Tienes cuenta?{" "}
            <Link href="/login" className="text-link">
              Inicia Sesión
            </Link>
          </p>
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="E-mail"
            onChange={handleChange}
            required
          />
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="contraseña"
            onChange={handleChange}
            required
          />
          {error && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <p className={styles.error_message}>{error}</p>
            </div>
          )}
          <button type="submit">Regístrate</button>
        </form>
      </div>
    </main>
  );
}

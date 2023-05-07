import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import styles from "../styles/config.module.css";
import stylesloader from "../components/loader.module.css";
import { useAuth } from "@/contexts/authContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { updateProfile, uploadFile, db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

export default function Config() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [err, setErr] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/chat-app-8f2a5.appspot.com/o/default-user.png?alt=media&token=62828855-85c5-422b-bac1-5d40a9805a8a"
  );

  useEffect(() => {
    if (user && user.displayName) {
      setDisplayName(user.displayName);
    }
    if (user && user.photoURL) {
      setPreviewUrl(user.photoURL.toString());
    }
  }, [user]);

  if (loading) return <Loading />;
  if (!user) {
    router.push("/");
    return null;
  }

  //capturar el input del nombre de usuario
  const handleNameChange = (e) => {
    if (e.target.value !== "") {
      setDisplayName(e.target.value);
    } else {
      setDisplayName(user.displayName);
    }
  };

  // capturar el input y mostrar la imagen antes de subirla
  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      const imageUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(imageUrl);
    }
  };

  const handleSubmit = async (e) => {
    setIsLoading(true); // actualizar el estado de carga a true
    e.preventDefault();
    try {
      // Actualizar los datos del usuario en Firebase autentication
      const photoUrl = file ? await uploadFile(file) : user.photoURL;
      const username = displayName;
      await updateProfile(user, { displayName: username, photoURL: photoUrl });

      // Actualizar los datos del usuario en Firebase database
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        displayName: username,
        photoURL: photoUrl,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // actualizar el estado de carga a false
    }
  };

  return (
    <main className="chat-screen">
      <section className="chatInterface normal-template">
        <Navbar />
        <section className="default-screen config-screen">
          <form onSubmit={handleSubmit} className={styles.form_config}>
            <label
              htmlFor="file"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div className={styles.profile_image}>
                <img src={previewUrl} alt="imagen de usuario" />
              </div>
              <span>Cambiar imagen del perfil</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                onChange={handleFileInputChange}
              />
            </label>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label htmlFor="username">Nombre de usuario</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={user.displayName}
                onChange={handleNameChange}
                style={{ textAlign: "left" }}
              />
            </div>
            {err && <span>Something went wrong</span>}
            <button>guardar cambios</button>
            {isLoading ? <div className={stylesloader.loader}></div> : null}
          </form>
        </section>
      </section>
    </main>
  );
}

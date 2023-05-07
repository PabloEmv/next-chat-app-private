import styles from "./loader.module.css";
export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className={styles.loader}></div>
      <h2>
        Cargando...
      </h2>
    </div>
  );
}

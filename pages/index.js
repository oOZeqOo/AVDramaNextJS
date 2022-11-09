import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        textAlign: "center",
      }}
    >
      <h1>AVDrama with Next js</h1>
      <div
        style={{
          height: 50,
          backgroundColor: "red",
          borderRadius: 20,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Link href="/timeline">Go to timeline</Link>
      </div>
    </div>
  );
}

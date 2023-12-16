import React from "react";
import styles from "/styles/HomePage.module.css";
import Image from "next/image";
import Link from "next/link";

const PageHeader = ({ viewWidth, height, isMobile }) => {
  const myStyles = {
    headerWrapper: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    header: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      maxWidth: 800,
      marginLeft: isMobile ? "5%" : "25%",
      marginRight: isMobile ? "5%" : "25%",
    },
    imageWrapper: { position: "absolute", zIndex: -1, overflowX: "hidden" },
    image: {
      objectFit: "cover",
      alignItems: "center",
      textAlign: "right",
      zIndex: -1,
      display: "flex",
      objectPosition: "50% 50%",
    },
    video: {
      width: 100,
      weight: 100,
      margin: "auto",
      objectFit: "contain",
      borderRadius: 10,
    },
    subText: {
      backgroundColor: "rgb(0, 0, 0, 0.3)",
      color: "white",
      padding: 10,
      borderRadius: 10,
    },
    button: {
      marginTop: 10,
      backgroundColor: "black",
      color: "white",
      borderRadius: 40,
      padding: 20,
      width: "200px",
    },
    moreInfoWrapper: { backgroundColor: "white" },
    moreInfo: { color: "black" },
    rowCenter: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
  };

  return (
    <>
      <div style={myStyles.headerWrapper}>
        <div style={myStyles.imageWrapper} className="fixed">
          <Image
            className="fixed"
            style={myStyles.image}
            src={"/images/sunflower-6.jpg"}
            alt={"Sunflowers"}
            width={viewWidth}
            height={height}
          />
        </div>
        <div style={myStyles.header}>
          <div>
            <h2 className={styles.title_outline}>A-V-Drama</h2>

            <h3 style={myStyles.subText} className="">
              The All New American-Vietnamese Experience Coming Your Way
            </h3>
            <video
              width="100"
              autoPlay={true}
              loop={true}
              style={{ borderRadius: 100, border: "5px solid black" }}
              onLoadStart={() => {}}
              playsInline={true}
              src={"/videos/AVDrama.mp4"}
              alt={"Missing"}
              muted={true}
              type="video/mp4"
            />
          </div>
          <div style={myStyles.rowCenter}>
            <Link href={"#more"} style={myStyles.button} scroll={false}>
              LEARN MORE
            </Link>
          </div>
        </div>
      </div>
      <div style={myStyles.moreInfoWrapper} id={"more"}>
        <h1 style={myStyles.moreInfo}>More Information about the A-V-Drama</h1>
      </div>
    </>
  );
};

export default PageHeader;

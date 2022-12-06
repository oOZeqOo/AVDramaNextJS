import React from "react";
import { Button } from "@mui/material";
import styles from "/styles/HomePage.module.css";
import Image from "next/image";

const PageHeader = ({ width, height, isMobile }) => {
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
    imageWrapper: { position: "absolute", zIndex: -1 },
    image: {
      objectFit: "cover",
      backgroundSize: "cover",
      alignItems: "center",
      textAlign: "right",
      zIndex: -1,
      display: "flex",
      objectPosition: "50% 50%",
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
        <div style={myStyles.imageWrapper}>
          <Image
            //   className={styles.home}
            style={myStyles.image}
            src={"/images/sunflower-6.jpg"}
            alt={"Sunflowers"}
            width={width}
            height={height * 2}
          />
        </div>
        <div style={myStyles.header}>
          <div>
            <h2 className={styles.title_outline}>A-V-Drama</h2>
            <h3 style={myStyles.subText}>
              The All New American-Vietnamese Experience Coming Soon
            </h3>
          </div>
          <div style={myStyles.rowCenter}>
            <Button style={myStyles.button}>LEARN MORE</Button>
          </div>
        </div>
      </div>
      <div style={myStyles.moreInfoWrapper}>
        <h1 style={myStyles.moreInfo}>More Information about the A-V-Drama</h1>
      </div>
    </>
  );
};

export default PageHeader;

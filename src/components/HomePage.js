import React from "react";
import { Divider } from "@mui/material";

import useDeviceSize from "./hooks/useDeviceSize";
import { isMobile } from "react-device-detect";

import CardSection from "./home_page/CardSection";
import AboutSection from "./home_page/AboutSection";
import PageHeader from "./home_page/PageHeader";
import NoteSection from "./home_page/NotesSection";

const HomePage = () => {
  const [width, height] = useDeviceSize();
  const styles = {
    contentWrapper: {
      width: width,
      height: "fit-content",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      textAlign: "center",
    },
    divider: {
      margin: "40px 5%",
      fontWeight: "bold",
      fontSize: 100,
      borderBottomWidth: 3,
    },
  };
  return (
    <>
      <div style={styles.contentWrapper}>
        <PageHeader viewWidth={width} height={height} isMobile={isMobile} />
        <CardSection />
        <Divider style={styles.divider} />
        <AboutSection viewWidth={width} />
        <Divider style={styles.divider} />
        <NoteSection viewWidth={width} />
      </div>
    </>
  );
};

export default HomePage;


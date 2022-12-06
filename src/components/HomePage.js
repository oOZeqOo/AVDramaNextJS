import React from "react";
import { Divider } from "@mui/material";

import useDeviceSize from "./hooks/useDeviceSize";
import { isMobile } from "react-device-detect";

import CardSection from "./home_page/CardSection";
import AboutSection from "./home_page/AboutSection";
import PageHeader from "./home_page/PageHeader";
import NoteSection from "./home_page/NotesSection";

const mobileDevice = isMobile || false;
const HomePage = () => {
  const [width, height] = useDeviceSize();
  return (
    <>
      <div style={styles.contentWrapper}>
        <PageHeader width={width} height={height} isMobile={isMobile} />
        <CardSection />
        <Divider style={styles.divider} />
        <AboutSection width={width} />
        <Divider style={styles.divider} />
        <NoteSection />
      </div>
    </>
  );
};

export default HomePage;

const styles = {
  contentWrapper: {
    width: "100vw",
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
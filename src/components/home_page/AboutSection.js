import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { isMobile } from "react-device-detect";
import { aboutSectionData } from "../../assets/data/AboutSectionData";
import { FadeInUpAnimation } from "../utils/Animations";

const mobileDevice = isMobile || false;

const AboutSection = ({ alternating = true, viewWidth = 800 }) => {
  return (
    <div style={styles.wordSectionWrapper}>
      {aboutSectionData?.map((item, index) =>
        getSection({ ...item, index, alternating, viewWidth })
      )}
    </div>
  );
};

export default AboutSection;

const getSection = ({
  imagePath,
  title,
  description,
  index,
  alternating = false,
  viewWidth,
}) => {
  const width = Math.min(viewWidth, 300);

  const imageBorderRadius = 100;
  const isSmallScreen = mobileDevice || width < 800;

  const getWordSection = (title, description) => (
    <div
      style={
        !isSmallScreen ? styles.wordSection : styles.wordSectionSmallScreen
      }
    >
      <div style={styles.titleWrapper}>
        <Typography variant={"h4"} sx={{ fontWeight: "bold" }} align={"center"}>
          {title}
        </Typography>
      </div>
      <div>
        {description?.map((item, index) => (
          <Typography key={index} style={{ marginTop: 10 }}>
            {item}
          </Typography>
        ))}
      </div>
    </div>
  );

  return (
    <FadeInUpAnimation key={index}>
      <div style={styles.wordImageWrapper}>
        {!isSmallScreen && alternating ? (
          index % 2 === 0 ? (
            <>
              {getWordSection(title, description)}
              <div style={styles.centerItems}>
                <Image
                  alt={"Image"}
                  width={width}
                  height={width}
                  src={imagePath}
                  style={{
                    objectFit: "cover",
                    borderRadius: imageBorderRadius,
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <div style={styles.centerItems}>
                <Image
                  alt={"Image"}
                  width={width}
                  height={width}
                  src={imagePath}
                  style={{
                    objectFit: "cover",
                    borderRadius: imageBorderRadius,
                  }}
                />
              </div>
              {getWordSection(title, description)}
            </>
          )
        ) : (
          <>
            <div style={styles.centerItems}>
              <Image
                alt={"Image"}
                width={width}
                height={width}
                src={imagePath}
                style={{ objectFit: "cover", borderRadius: imageBorderRadius }}
              />
            </div>
            {getWordSection(title, description)}
          </>
        )}
      </div>
    </FadeInUpAnimation>
  );
};

const styles = {
  wordImageWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    margin: 20,
  },
  wordSectionWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  wordSection: {
    width: "50%",
    minWidth: "600px",
    textAlign: "left",
    marginLeft: 20,
    padding: "0px 40px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  wordSectionSmallScreen: {
    width: "90%",
    minWidth: "100%",
    textAlign: "left",
    marginLeft: 0,
    padding: "0px 20px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    margin: mobileDevice ? "40px 0px" : "0px 0px 40px 0px",
  },
  centerItems: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
};

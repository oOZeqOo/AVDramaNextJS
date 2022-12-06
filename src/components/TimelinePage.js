import React, { useMemo, useEffect } from "react";
import { timelineData } from "../assets/data/TimelineData";
import cssStyles from "../../styles/Timeline.module.css";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "./common/IconButton";
import "../../styles/js/all";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { isMobile } from "react-device-detect";
import useDeviceSize from "./hooks/useDeviceSize";
import { Divider } from "@mui/material";

const TimelinePage = () => {
  return createTimeline(timelineData);
};

export default TimelinePage;

const createTimeline = (data) => {
  const [width, height] = useDeviceSize();
  const isSmallScreen = isMobile || width < 800;
  const flattenData = useMemo(() => {
    return Object.keys(data)
      ?.map((key, topIndex) => data[key]?.map((item, index) => item))
      .flat();
  }, [data]);
  const timelineClass =
    width < 1200 || isSmallScreen
      ? {
          [`& .${timelineItemClasses.root}:before`]: {
            flex: 0,
            padding: 0,
          },
        }
      : {};

  return (
    <div className={cssStyles.root}>
      <div className={cssStyles.timeline_nav}>
        <Link
          href="/"
          style={{
            backgroundColor: "pink",
            border: "none",
            fontSize: "x-large",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 30,
          }}
        >
          <IconButton
            style={{
              color: "rgb(0, 94, 255)",
              fontWeight: "bolder",

              margin: "auto",
              width: 30,
            }}
          >
            <KeyboardBackspaceIcon style={{ fontSize: "40" }} />
          </IconButton>
        </Link>
        <Link href="#start"> Start </Link>
        {Object.keys(data)?.map((key, index) => (
          <Link href={`#${key}`} key={index}>
            {key}
          </Link>
        ))}
        <Link href="#latest"> Latest </Link>
      </div>
      <div style={{ paddingTop: 0, width: "100vw" }}>
        <Timeline
          position={width < 1200 || isSmallScreen ? "right" : "alternate"}
          sx={timelineClass}
          id={"start"}
        >
          {flattenData?.map((item, index) =>
            createTimeLineItem(
              item?.month,
              item?.title,
              item?.description,
              item?.tag,
              item?.imgPath,
              item?.isVideo || false,
              index,
              index === 0 || index == flattenData?.length,
              isSmallScreen
            )
          )}
        </Timeline>
        <footer style={{ padding: 0 }}>
          <div id="latest"></div>
        </footer>
      </div>
    </div>
  );
};

const createTimeLineItem = (
  month,
  title,
  description,
  tag,
  imgPath,
  isVideo = false,
  index,
  endItem = false,
  isSmallScreen
) => {
  return (
    <>
      {!endItem && isSmallScreen && <Divider style={styles.divider} />}
      <TimelineItem
        id={tag ? `${tag}` : undefined}
        style={index === 0 ? { marginTop: 50 } : {}}
      >
        <TimelineSeparator>
          <TimelineDot variant="outlined" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className={[cssStyles.content, cssStyles.anchor_container]}>
            <span className={cssStyles.year}>{month}</span>
            <h3 className={[cssStyles.title, cssStyles.h4]}>{title}</h3>
            <p
              className={cssStyles.description}
              style={{ fontSize: "large", fontWeight: "bold" }}
            >
              {description}
            </p>
            <div className={cssStyles.icon}>
              <span></span>
            </div>
          </div>
          <div style={styles.imageWrapper}>
            {isVideo ? (
              <>
                <video
                  controls={true}
                  loop={true}
                  style={styles.image}
                  onLoadStart={() => {}}
                  playsInline={true}
                  src={imgPath}
                />
                <source type="video/mp4" />
              </>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imgPath}
                alt={title || "Missing"}
                style={styles.image}
              />
            )}
          </div>
        </TimelineContent>
      </TimelineItem>
    </>
  );
};

const styles = {
  imageWrapper: {
    width: 300,
    height: 300,
    backgroundColor: "black",
    border: "5px solid black",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "auto",
  },
  image: {
    width: 300,
    weight: 300,
    margin: "auto",
    objectFit: "contain",
  },
  divider: {
    margin: "5px 5%",
    fontWeight: "bold",
    fontSize: 100,
    borderBottomWidth: 3,
  },
};

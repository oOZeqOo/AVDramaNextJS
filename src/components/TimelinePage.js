import React, { useMemo, useState } from "react";
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
import { LoadingButton } from "@mui/lab";
import { FixedSizeList as List } from "react-window";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useEffect } from "react";
const TimelinePage = () => {
  return createTimeline(timelineData);
};

export default TimelinePage;

const createTimeline = (data) => {
  const [loadingSection, setLoadingSection] = useState(false);
  const [links, setLinks] = useState([]);
  const [width, height] = useDeviceSize();
  const isSmallScreen = isMobile || width < 800;
  const flattenData = useMemo(() => {
    var count = 0;
    return Object.keys(data)
      ?.map((key, topIndex) => {
        count++;
        return data[key]?.map((item, index) => {
          return {
            ...item,
            tag: index === 0 ? count : undefined,
          };
        });
      })
      .flat();
  }, [data]);

  useEffect(() => {
    var count = 0;
    const list = [];
    Object.keys(data)?.forEach((key) => {
      list.push(count);
      count += data[key]?.length;
    });
    console.log(list);
    setLinks(list);
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

  const setLoadingHold = () => {
    setLoadingSection(true);
    setTimeout(() => setLoadingSection(false), 0);
  };

  return (
    <div className={cssStyles.root}>
      <div className={cssStyles.timeline_nav}>
        <Link
          onClick={() => setLoadingHold()}
          href={loadingSection ? "" : "/"}
          style={{
            backgroundColor: "pink",
            border: "none",
            fontSize: "x-large",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: 30,
            marginLeft: 50,
            // marginRight: 30,
          }}
        >
          <IconButton
            style={{
              color: "rgb(0, 94, 255)",
              fontWeight: "bolder",
              margin: "auto",
              width: 30,
              height: "fit-content",
              borderRadius: "30%",
            }}
          >
            <KeyboardBackspaceIcon style={{ fontSize: "40" }} />
          </IconButton>
        </Link>
        <LoadingButton loading={loadingSection}>
          <Link
            scroll={false}
            href={loadingSection ? "#Waiting" : "#start"}
            onClick={() => setLoadingHold()}
            style={
              loadingSection
                ? { backgroundColor: "grey", color: "lightgrey" }
                : { scrollMarginTop: "4em" }
            }
          >
            Start
          </Link>
        </LoadingButton>
        {Object.keys(links)?.map((key, index) => (
          <LoadingButton loading={loadingSection} key={index}>
            <Link
              scroll={false}
              href={loadingSection ? "#Waiting" : `#${links?.[index]}`}
              key={index}
              onClick={() => setLoadingHold()}
              style={
                loadingSection
                  ? { backgroundColor: "grey", color: "lightgrey" }
                  : { scrollMarginTop: "4em" }
              }
            >
              {Object.keys(data)?.[index]}
            </Link>
          </LoadingButton>
        ))}
        <LoadingButton loading={loadingSection}>
          <Link
            scroll={false}
            href={"#latest"}
            onClick={() => setLoadingHold()}
            style={
              loadingSection
                ? { backgroundColor: "grey", color: "lightgrey" }
                : { scrollMarginTop: "4em" }
            }
          >
            New
          </Link>
        </LoadingButton>
      </div>
      <div
        style={{
          paddingTop: 0,
          width: "100vw",
          overflowY: "scroll",
          height: "calc(100vh - 50px)",
        }}
      >
        <Timeline
          position={width < 1200 || isSmallScreen ? "right" : "alternate"}
          sx={timelineClass}
          id={"start"}
        >
          {flattenData?.map((item, index) => (
            <TimelineItem
              id={index}
              key={index}
              className={index % 2 ? "ListItemOdd" : "ListItemEven"}
            >
              {createTimeLineItem(
                item?.month,
                item?.title,
                item?.description,
                item?.tag,
                item?.imgPath,
                item?.isVideo || false,
                index
              )}
            </TimelineItem>
          ))}
          {/* <RowVirtualizerFixed
            data={flattenData}
            rotatingSides={width < 1200 || isSmallScreen}
          /> */}
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
  isVideo = false
) => {
  return (
    <>
      <TimelineSeparator>
        <TimelineDot
          variant="outlined"
          style={{ padding: 5, borderWidth: 4 }}
        />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>
        <Divider style={styles.divider} />
        <div className={[cssStyles.content, cssStyles.anchor_container]}>
          <span style={styles.year}>{month}</span>
          <h3 style={styles.title}>{title}</h3>
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
            <img src={imgPath} alt={title || "Missing"} style={styles.image} />
          )}
        </div>
      </TimelineContent>
    </>
  );
};

function RowVirtualizerFixed({ data, rotatingSides = false }) {
  const parentRef = React.useRef();
  console.log(rotatingSides);
  const rowVirtualizer = useVirtualizer({
    count: data?.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 600,
    overscan: !rotatingSides ? 10 : data?.length,
  });

  return (
    <>
      <div
        ref={parentRef}
        className="List"
        style={{
          height: `100vh`,
          width: `100vw`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            height: `${rowVirtualizer.getTotalSize()}px`,
            width: "100%",
            position: "relative",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow, index) => (
            <TimelineItem
              id={index}
              key={virtualRow.index}
              className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: `${virtualRow.size}px`,
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              {createTimeLineItem(
                data[virtualRow?.index]?.month,
                data[virtualRow?.index]?.title,
                data[virtualRow?.index]?.description,
                data[virtualRow?.index]?.tag,
                data[virtualRow?.index]?.imgPath,
                data[virtualRow?.index]?.isVideo || false,
                virtualRow?.index
              )}
            </TimelineItem>
          ))}
        </div>
      </div>
    </>
  );
}

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
  year: {
    fontSize: 30,
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  image: {
    width: 300,
    weight: 300,
    margin: "auto",
    objectFit: "contain",
  },
  divider: {
    margin: "15px 0px 5%",
    fontWeight: "bold",
    fontSize: 100,
    borderBottomWidth: 3,
  },
};

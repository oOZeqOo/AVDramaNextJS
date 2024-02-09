import React, { useMemo, useState } from "react";
import { timelineData } from "@/assets/data/TimelineData";
import cssStyles from "@/styles/Timeline.module.css";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "./common/IconButton";
import "@/styles/js/all";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { isMobile } from "react-device-detect";
import useDeviceSize from "./hooks/useDeviceSize";
import { Button, Divider, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import LoadingImage from "./common/LoadingImage";

const TimelinePage = () => {
  return createTimeline(timelineData);
};

export default TimelinePage;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      //   hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{
        transition: "2s all ease",
        display: value !== index ? "hidden" : undefined,
        fontWeight: "bold",
      }}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const createTimeline = (data) => {
  const [loadingSection, setLoadingSection] = useState(false);
  const [links, setLinks] = useState([]);
  const [width, height] = useDeviceSize();
  const isSmallScreen = isMobile || width < 800;
  const [value, setValue] = useState(0);
  const router = useRouter();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    <Box
      sx={{
        width: "100%",
        transition: "all 0.5s ease",
        scrollbarGutter: "stable",
      }}
      className={cssStyles.root}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          height: width < 900 ? 150 : 50,
          overflowX: "auto",
          flexWrap: "wrap",
        }}
        className={cssStyles.timeline_nav}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "40%",
          }}
          id="first"
        >
          <Button
            variant="contained"
            onClick={() => router.push("/")}
            style={{ margin: "5px 10px" }}
          >
            Back
          </Button>
        </div>
        <div
          className="flex-1 flex flex-col justify-start"
          style={{ width: "max(fit-content, 60%)", marginLeft: 40, height: 50 }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            // fullWidth="true"
          >
            {Object.keys(data)?.map((item, index) => (
              <Tab
                label={
                  <Typography
                    style={{
                      backgroundColor: value !== index ? "#cd4870" : "red",
                      color: value !== index ? "black" : "white",
                      borderRadius: 20,
                      padding: "5px 10px",
                      fontWeight: "bold",
                    }}
                  >
                    {item}
                  </Typography>
                }
                {...a11yProps(index)}
                key={index}
                style={{
                  transition: "0.5s all ease",
                  padding: 0,
                }}
                sx={{}}
              />
            ))}
          </Tabs>
        </div>
      </Box>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: 10,
        }}
      >
        <Link
          scroll={false}
          href={"#latest"}
          onClick={() => setLoadingHold()}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "1px solid black",
            borderRadius: 20,
            fontWeight: "bold",
            fontSize: "large",
            padding: "5px 5px",
          }}
        >
          Go to the bottom
        </Link>
      </div>
      {Object.entries(data)?.map(([key, v], index) => (
        <CustomTabPanel value={value} index={index} key={index}>
          <Timeline
            position={width < 1200 || isSmallScreen ? "right" : "alternate"}
            sx={timelineClass}
            id={"start"}
          >
            {v?.map((item, index) => (
              <TimelineItem
                id={index !== v?.length - 1 ? index : "latest"}
                key={index}
                className={index % 2 ? "ListItemOdd" : "ListItemEven"}
              >
                {createTimeLineItem(
                  item?.month,
                  item?.title,
                  item?.description,
                  item?.tag,
                  item?.imgPath,
                  item?.imgClass,
                  item?.isVideo || false,
                  item?.link,
                  index
                )}
              </TimelineItem>
            ))}
            {/* <RowVirtualizerFixed
            data={flattenData}
            rotatingSides={width < 1200 || isSmallScreen}
          /> */}
          </Timeline>
        </CustomTabPanel>
      ))}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: 10,
          paddingBottom: 50,
        }}
      >
        <Link
          scroll={false}
          href={"#first"}
          onClick={() => setLoadingHold()}
          style={{
            backgroundColor: "blue",
            color: "white",
            border: "1px solid black",
            borderRadius: 20,
            fontWeight: "bold",
            fontSize: "large",
            padding: "5px 5px",
          }}
        >
          Go back to the top
        </Link>
      </div>
    </Box>
  );
};

const createTimeLineItem = (
  month,
  title,
  description,
  tag,
  imgPath,
  imgClass,
  isVideo = false,
  link = null,
  index
) => {
  const imgStyle =
    imgClass == "img-small"
      ? styles.smallerImage
      : imgClass == "img-big"
      ? styles.biggerImage
      : styles.image;
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

          {link?.length > 0 ? (
            <p>
              <a href={link} style={styles.timeline_link}>
                &gt;&gt;&gt;&gt;&gt; Check it out &lt;&lt;&lt;&lt;&lt;
              </a>
            </p>
          ) : (
            ""
          )}

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
            <LoadingImage
              src={imgPath}
              alt={title || "Missing"}
              width={imgStyle?.width}
              height={imgStyle?.width}
              style={imgStyle}
            />
          )}
        </div>
      </TimelineContent>
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
  year: {
    fontSize: 30,
    fontWeight: "bold",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  biggerImage: {
    width: 300,
    weight: 300,
    margin: "auto",
    objectFit: "contain",
  },
  image: {
    width: 250,
    weight: 250,
    margin: "auto",
    objectFit: "contain",
  },
  smallerImage: {
    width: 200,
    weight: 200,
    margin: "auto",
    objectFit: "contain",
  },
  divider: {
    margin: "15px 0px 5%",
    fontWeight: "bold",
    fontSize: 100,
    borderBottomWidth: 3,
  },
  timeline_nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    position: "sticky",
  },
  timeline_link: {
    color: "blue",
    fontWeight: "bold",
    fontSize: "large",
    ":hover": {
      color: "pink",
    },
  },
};

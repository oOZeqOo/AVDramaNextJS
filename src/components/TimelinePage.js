import React, { useMemo, useRef, useState } from "react";
import { timelineData } from "@/assets/data/TimelineData";
import cssStyles from "@/styles/Timeline.module.css";
import Link from "next/link";
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
import { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";
import LoadingImage from "./common/LoadingImage";

const TimelinePage = () => {
  return <CreateTimeline data={timelineData} />;
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
      ref={props.forwardRef}
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

const CreateTimeline = ({ data }) => {
  const [loadingSection, setLoadingSection] = useState(false);
  const [links, setLinks] = useState([]);
  const scrollRef = useRef(null);
  const [width, height] = useDeviceSize();
  const isSmallScreen = isMobile || width < 800;
  const [value, setValue] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const query = router.query;
    let selectedTab = parseInt(query.tab) || 0;
    if (selectedTab >= 0 && value !== selectedTab) {
      setValue(selectedTab);
    }
  }, [router.query]); //eslint-disable-line

  const handleChange = (event, newValue) => {
    // setValue(newValue);
    const query = router.query;
    query.tab = newValue;
    const queryString = Object.entries(query)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
    router.push(`${router.route}?${queryString}`);
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

  const setLoadingHold = (spot) => {
    setLoadingSection(true);
    setTimeout(() => setLoadingSection(false), 0);
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: spot,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      style={{
        transition: "all 0.5s ease",
        scrollbarGutter: "stable",
        // height: "80vh",
      }}
      className="w-full sm:pl-0 bg-[lightyellow] flex flex-col max-h-screen"
    >
      <div
        style={{
          backgroundColor: "#FFC0CB",
        }}
        className="flex flex-wrap items-center lg:justify-between border-b h-fit flex-col lg:flex-row w-full sticky "
      >
        <div
          className="flex flex-row justify-center lg:justify-between min-w-[10%] max-w-[40%] "
          id="first"
        >
          <Button
            variant="contained"
            onClick={() => router.push("/")}
            style={{ margin: "5px 10px" }}
            className="bg-blue-500"
          >
            Back
          </Button>
        </div>
        <div
          className="flex-1 flex flex-col justify-center items-center sm:ml-10 md:ml-2 w-full overflow-auto "
          style={{ maxWidth: "100vw", height: 50 }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="year-tabs"
            className="w-fit max-w-full [&>div]:!overflow-x-auto h-full"
            scrollButtons="auto"
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
                  height: "fit-content",
                }}
                sx={{}}
              />
            ))}
          </Tabs>
        </div>
        <div
          className="flex flex-row justify-center lg:justify-between  min-w-[10%] max-w-[40%] "
          id="third"
        ></div>
      </div>

      <div
        className="flex flex-row justify-center m-2  pb-1"
      >
        <Link
          scroll={false}
          href={"#"}
          onClick={() => setLoadingHold(scrollRef?.current?.scrollHeight)}
          className="bg-blue-600 text-white border  text-bold text-lg p-2 rounded-xl"

        >
          Go to the bottom
        </Link>
      </div>

      {Object.entries(data)?.map(([key, v], index) => (
        <CustomTabPanel
          value={value}
          index={index}
          forwardRef={value === index ? scrollRef : null}
          key={index}
          className="sm:!pl-0  overflow-y-auto flex-2"
        >

          <Timeline
            position={width < 1200 || isSmallScreen ? "right" : "alternate"}
            sx={timelineClass}
            id={"start"}
          >
            {v?.map((item, index) => (
              <TimelineItem
                id={index !== v?.length - 1 ? `${index}` : "latest"}
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
      className="flex flex-row justify-center m-2 pb-50 md:pb-0"

      >
        <Link
          scroll={false}
          href={"#"}
          onClick={() => setLoadingHold(0)}
          className="bg-blue-600 text-white border text-bold text-lg p-2 rounded-xl"
        >
          Go back to the top
        </Link>
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
            style={{ fontSize: "large", fontWeight: "bold", marginBottom: 20 }}
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
    margin: "10px 0px",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    margin: "10px 0px",
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

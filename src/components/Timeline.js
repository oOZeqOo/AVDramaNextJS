import Image from "next/image";
import React from "react";
import { timelineData } from "../assets/data/TimelineData";
import styles from "../../styles/Timeline.module.css";
import Link from "next/link";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import IconButton from "./common/Button";
import "../../styles/js/all";

const Timeline = () => {
  return createTimeline(timelineData);
};

export default Timeline;

const createTimeLineItem = (
  month,
  title,
  description,
  imgPath,
  isVideo = false
) => {
  return (
    <div className={styles.timeline_content}>
      <div className={styles.circle}>
        <span className={styles.homebox}>
          {isVideo ? (
            <>
              <video
                controls={true}
                loop={true}
                className={styles.img}
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
              className={styles.img}
            />
          )}
        </span>
      </div>
      <div className={[styles.content, styles.anchor_container]}>
        <span className={styles.year}>{month}</span>
        <h3 className={[styles.title, styles.h4]}>{title}</h3>
        <p
          className={styles.description}
          style={{ fontSize: "large", fontWeight: "bold" }}
        >
          {description}
        </p>
        <div className={styles.icon}>
          <span></span>
        </div>
      </div>
    </div>
  );
};

const createTimeline = (data) => {
  return (
    <div className={styles.root}>
      <div className={styles.timeline_nav}>
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
            size={"large"}
            style={{
              color: "rgb(0, 94, 255)",
              fontWeight: "bolder",
              paddingBottom: "5px",
              width: 30,
            }}
          >
            <KeyboardBackspaceIcon />
          </IconButton>
        </Link>
        <Link href="#beginning"> Beginning </Link>
        {Object.keys(data)?.map((key, index) => (
          <Link href={`#${key}`} key={index}>
            {key}
          </Link>
        ))}
        <Link href="#latest"> Latest </Link>
      </div>
      <section style={{ minHeight: "fit-content" }}>
        <div
          className={[styles.container, styles.py_5]}
          style={{ transition: "0.5s", marginTop: "2%", height: "100%" }}
          id="beginning"
        >
          <div className={styles.row}>
            <div className={"col-md-12"}>
              <div className={styles.main_timeline} id="main_timeline">
                {Object.keys(data)?.map((key, topIndex) =>
                  data[key]?.map((item, index) => {
                    return (
                      <div
                        className={styles.timeline}
                        key={index}
                        id={index === 0 ? `${key}` : undefined}
                      >
                        {createTimeLineItem(
                          item?.month,
                          item?.title,
                          item?.description,
                          item?.imgPath,
                          item?.isVideo || false
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div id="latest"></div>
      </footer>
    </div>
  );
};

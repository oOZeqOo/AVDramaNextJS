import Image from "next/image";
import React from "react";
import { timelineData } from "../assets/data/TimelineData";

const Timeline = () => {
  return createTimeline(timelineData);
};

export default Timeline;

const createTimeLineItem = (
  month,
  title,
  description,
  imgPath,
  isVideo = false,
  index
) => {
  const imagePath = "/images/sunflower-6.jpg";
  console.log();

  return (
    <div className="timeline" key={index}>
      <div className="timeline-content">
        <div className="circle">
          <span className="homebox">
            {isVideo ? (
              <>
                <video
                  controls={true}
                  loop={true}
                  className="img"
                  onLoadStart={() => {}}
                  playsInline={true}
                  src={imgPath}
                />
                <source type="video/mp4" />
              </>
            ) : (
              <img
                src={imgPath}
                alt={title || "Missing"}
                width="200"
                height="200"
              />
            )}
          </span>
        </div>
        <div className="content anchor-container">
          <span className="year">{month}</span>
          <h3 className="title h4">{title}</h3>
          <p
            className="description"
            style={{ fontSize: "large", fontWeight: "bold" }}
          >
            {description}
          </p>
          <div className="icon">
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};
const createTimeline = (data) => {
  return (
    <div className="main-timeline">
      {Object.keys(data)?.map((key, topIndex) =>
        data[key]?.map((item, index) => {
          return createTimeLineItem(
            item?.month,
            item?.title,
            item?.description,
            item?.imgPath,
            item?.isVideo || false,
            index
          );
        })
      )}
    </div>
  );
};

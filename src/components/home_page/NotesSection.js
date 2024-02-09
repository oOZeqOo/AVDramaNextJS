import Image from "next/image";
import React from "react";
import { homePageNotes } from "@/assets/data/HomePageNotes";

const NoteSection = ({ viewWidth = 200 }) => {
  return buildNoteSection(viewWidth);
};

export default NoteSection;

const buildNoteSection = (viewWidth) => {
  const width = Math.min(viewWidth, 300);
  return (
    <div style={styles.contentWrapper} id={"secret"}>
      <div style={styles.content}>
        <div>{getElementsContent(homePageNotes?.title)}</div>
        <div>{getElementsContent(homePageNotes?.message)}</div>
        <div>{getElementsContent(homePageNotes?.extraNote)}</div>
        <div>{getElementsContent(homePageNotes?.extras)}</div>
        <div style={styles.gifWrapper}>
          {homePageNotes?.pics?.map((url, index) => {
            let imgWidth = Math.min(width, 300);
            let imgHeight = Math.min(width, 300);
            const mode = url.style;

            if (mode === "landscape") imgWidth = Math.min(viewWidth, 400);
            else if (mode === "portrait") imgHeight = Math.min(viewWidth, 400);

            return (
              <Image
                key={index}
                src={url.src}
                width={imgWidth}
                height={imgHeight}
                alt={"gif"}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const getElementsContent = (item) => {
  switch (item?.element) {
    case "h1":
      return item?.content?.map((item, index) => (
        <h1 key={index} style={styles.blackText}>
          {item}
        </h1>
      ));
    case "h2":
      return item?.content?.map((item, index) => (
        <h2 key={index} style={styles.blackText}>
          {item}
        </h2>
      ));
    case "h3":
      return item?.content?.map((item, index) => (
        <h3 key={index} style={styles.blackText}>
          {item}
        </h3>
      ));
    case "h4":
      return item?.content?.map((item, index) => (
        <h4 key={index} style={styles.blackText}>
          {item}
        </h4>
      ));
    case "h5":
      return item?.content?.map((item, index) => (
        <h5 key={index} style={styles.blackText}>
          {item}
        </h5>
      ));
    case "h6":
      return item?.content?.map((item, index) => (
        <h6 key={index} style={styles.blackText}>
          {item}
        </h6>
      ));

    case "tiny":
      return item?.content?.map((item, index) => (
        <h6
          key={index}
          style={{
            ...styles.blackText,
            fontSize: 5,
          }}
        >
          {item}
        </h6>
      ));
    default:
      return item?.content?.map((item, index) => (
        <p key={index} style={styles.blackText}>
          {item}
        </p>
      ));
  }
};

const styles = {
  blackText: {
    color: "black",
    margin: 0,
    textAlign: "middle",
  },
  center: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  contentWrapper: {
    width: "100%",
  },
  content: {
    width: "90%",
    margin: "auto",
  },
  gifWrapper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 50,
  },
};

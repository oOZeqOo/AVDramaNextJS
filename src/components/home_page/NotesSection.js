import Image from "next/image";
import React, { useEffect } from "react";
import { homePageNotes } from "../../assets/data/HomePageNotes";

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
          <Image
            src={"/gifs/drinking_boba.gif"}
            width={width}
            height={width}
            alt={"gif"}
          />
          <Image
            src={"/gifs/best_tea.gif"}
            width={width}
            height={width}
            alt={"gif"}
          />
          <Image
            src={"/gifs/happy_boba.gif"}
            width={width}
            height={width}
            alt={"gif"}
          />
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

import React, { useEffect, useMemo, useState } from "react";
import { imageGalleryData } from "../../assets/data/ImageGalleryData";
import { FixedSizeGrid as Grid } from "react-window";
import useDeviceSize from "../hooks/useDeviceSize";
import IconButton from "../common/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import Tooltip from "../common/Tooltip";

const ImageGridContainer = () => {
  const [width, height] = useDeviceSize();
  const navBarHeight = 50;
  const [gridPixelWidth, setGridPixelWidth] = useState(
    width !== 0 ? width : 400
  );
  const [gridPixelHeight, setGridPixelHeight] = useState(
    height !== 0 ? height - navBarHeight : 800 - navBarHeight
  );
  const [gridItems, setGridItems] = useState([]);
  const gridItemsWidth = Math.max(Math.floor(gridPixelWidth / 220), 1);
  const imgWidth = gridItemsWidth > 1 ? 200 : width - 20;
  const imgHeight = gridItemsWidth > 1 ? 200 : 500;
  const styles = {
    navBar: {
      height: navBarHeight,
      backgroundColor: "pink",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    imageGridWrapper: {
      width: "100%",
      height: gridPixelHeight,
      backgroundColor: "lightyellow",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
    },
    gridStyle: {
      margin: "auto",
      flex: 1,
      marginLeft: 0,
      marginRight: 0,
    },
    imageWrapper: {
      border: "1px solid black",
      padding: "60px",
      maxWidth: "650px",
      background: "lighten(mediumseagreen, 20%)",
      border: "5px dashed mediumseagreen",
      boxShadow:
        "0 0 0 (5px / 2) darken(mediumseagreen, 20%), 0 0 0 (5px * 2.5) #fff, inset 0 0 0 (5px / 2) darken(mediumseagreen, 20%), 0 5px (5px * 2) (5px * 3) rgba(0,0,0,0.5), inset 0 0 0 (5px * 1.2) #fff, inset 0 0 100vw 100vw beige;",
      color: "mediumseagreen",
      fontFamily: "Marcellus, serif",
      fontSize: "3em",
      textShadow: "0 2px #fff",
      textAlign: "center",
    },
    image: {
      border: "2px solid black",
      borderRadius: "10px",
      backgroundColor: "black",
      objectFit: "contain",
      width: imgWidth,
      height: imgHeight == 200 ? imgHeight : "",
      maxHeight: imgHeight,
      margin: 10,
    },
  };
  useEffect(() => {
    setGridPixelWidth(width);
    setGridPixelHeight(height - navBarHeight);
  }, [width, height]);

  useEffect(() => {
    const values = [];

    const flatValues = shuffleArray(
      Object.keys(imageGalleryData)?.flatMap((key) =>
        imageGalleryData?.[key]?.flatMap((value) => `${key}${value}`)
      ),
      true
    );
    for (let i = 0; i < flatValues?.length; i += gridItemsWidth) {
      const chunk = flatValues?.slice(i, i + gridItemsWidth);
      values.push(chunk);
    }
    setGridItems(values);
  }, [gridItemsWidth]);

  function shuffleArray(array, debug = false) {
    if (debug) return array;

    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  const ItemRenderer = ({ columnIndex, rowIndex, style }) => {
    const value = gridItems?.[rowIndex]?.[columnIndex];
    let split = value?.split("/");
    split = split?.[split?.length - 1]?.split(".")?.[0];
    return (
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: "center",
          //   left:
          //     Number.parseInt(`${style.left}`) + (gridItemsWidth > 1 ? 100 : 0),
        }}
        key={columnIndex * gridItemsWidth + rowIndex}
      >
        {value && (
          <Tooltip text={`${split}`}>
            <img
              src={value}
              alt={`Missing Image: ${value}`}
              style={styles.image}
            />
          </Tooltip>
        )}
      </div>
    );
  };

  return (
    <>
      <div style={styles.navBar}>
        <Link
          href={"/"}
          style={{
            width: "fit-content",
          }}
        >
          <IconButton
            style={{
              color: "rgb(0, 94, 255)",
              fontWeight: "bolder",
              width: "fit-content",
              height: "100%",
              marginRight: 0,
              borderRadius: "30%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: 0,
                margin: "auto",
                verticalAlign: "middle",
              }}
            >
              <KeyboardBackspaceIcon style={{ fontSize: "40" }} />
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <h3
                  style={{
                    textAlign: "left",
                    margin: "0px",
                    color: "black",
                  }}
                >
                  Back to Homepage
                </h3>
              </div>
            </div>
          </IconButton>
        </Link>
      </div>
      <div style={styles.imageGridWrapper}>
        {gridItems?.length > 0 && (
          <Grid
            style={styles.gridStyle}
            width={gridPixelWidth}
            height={gridPixelHeight}
            columnCount={gridItemsWidth}
            columnWidth={imgWidth + 20}
            rowHeight={imgHeight + 20}
            rowCount={gridItems?.length}
            overscanRowCount={6}
          >
            {(props) => ItemRenderer({ ...props })}
          </Grid>
        )}
        {/* {Object.keys(imageGalleryData)?.map((parentPath, index) =>
        imageGalleryData[parentPath]?.map((childPath, index) => (
          <div style={styles.imageWrapper} key={index}>
            <img
              imgPath={`${parentPath}${childPath}`}
              alt={"Missing Image"}
              style={styles.image}
            />
          </div>
        ))
      )} */}
      </div>
    </>
  );
};

export default ImageGridContainer;

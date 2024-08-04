import React, { useEffect, useMemo, useState } from "react";
import { imageGalleryData } from "@/assets/data/ImageGalleryData";
import { FixedSizeGrid as Grid } from "react-window";
import useDeviceSize from "../hooks/useDeviceSize";
import IconButton from "../common/IconButton";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import Tooltip from "../common/Tooltip";
import Image from "next/image";
import LoadingImage from "../common/LoadingImage";
import SearchBar from "../common/SearchBar";
import ResponsiveGrid from "./ResponsiveGrid";

function extractNumber(path) {
  if (!path) return false;
  // Use a regular expression to match the number in the string
  const match = path.match(/\/(\d+)\.jpg$/);
  // Return the number as a string, or null if no match is found
  return match ? match[1] : false;
}

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
  const [searchTerm, setSearchTerm] = useState("");
  const [lowerBoundSearch, setLowerBoundSearch] = useState("");
  const [upperBoundSearch, setUpperBoundSearch] = useState("");
  const gridItemsWidth = Math.max(Math.floor(gridPixelWidth / 240), 1);
  const imgWidth = gridItemsWidth > 1 ? 200 : width - 40;
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
      display: "flex",
      justifyContent: "center",
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

    let flatValues = shuffleArray(
      Object.keys(imageGalleryData)?.flatMap((key) =>
        imageGalleryData?.[key]?.flatMap((value) => `${key}${value}`)
      ),
      true
    );
    let onWard = searchTerm.indexOf("+") === searchTerm.length - 1;
    let term = parseInt(searchTerm);

    setLowerBoundSearch(parseInt(extractNumber(flatValues[0])));
    setUpperBoundSearch(
      parseInt(extractNumber(flatValues[flatValues?.length - 1]))
    );
    if (!isNaN(term)) {
      flatValues = flatValues?.filter((item) =>
        searchTerm?.length > 0
          ? onWard
            ? parseInt(extractNumber(item)) >= term
            : parseInt(extractNumber(item)) === term
          : true
      );
    }
    for (let i = 0; i < flatValues?.length; i += gridItemsWidth) {
      const chunk = flatValues?.slice(i, i + gridItemsWidth);
      values.push(chunk);
    }
    setGridItems(values);
  }, [gridItemsWidth, searchTerm]);

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

  function reverseArray(array, debug = false) {
    // TODO : reverse the array
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
          alignItems: "center",
          //   left:
          //     Number.parseInt(`${style.left}`) + (gridItemsWidth > 1 ? 100 : 0),
        }}
        key={columnIndex * gridItemsWidth + rowIndex}
      >
        {value && (
          <Tooltip text={`${split}`}>
            <LoadingImage
              src={value}
              alt={`Missing Image: ${value}`}
              style={styles.image}
              width={imgWidth}
              height={imgHeight}
              onLoad={() => setImgLoaded(true)}
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
      <div
        className="flex flex-col items-center"
        style={{ backgroundColor: "lightyellow" }}
      >
        <SearchBar
          onChange={(value) => {
            setSearchTerm(value);
          }}
        />
      </div>
      <div
        className="flex flex-col items-center text-center"
        style={{ backgroundColor: "lightyellow" }}
      >
        <p>
          Values: {lowerBoundSearch} - {upperBoundSearch}
        </p>
        <p>Add a '+' to get all pics after a certain number</p>
      </div>
      <div style={styles.imageGridWrapper}>
        {gridItems?.length > 0 && (
          // <ResponsiveGrid
          //   items={gridItems}
          //   itemWidth={imgWidth + 20}
          //   itemHeight={imgHeight + 20}
          //   gridHeight={gridPixelHeight}
          // />
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

import React, { useEffect, useMemo, useState } from "react";
import { imageGalleryData } from "../../assets/data/ImageGalleryData";
import { FixedSizeGrid as Grid } from "react-window";
import useDeviceSize from "../hooks/useDeviceSize";
import ScreenSizeDetector from "screen-size-detector";

const ImageGridContainer = () => {
  const styles = {
    imageGridWrapper: {
      width: "100%",
      height: "100%",
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
    imageWrapper: { border: "1px solid black" },
    image: {
      objectFit: "contain",
      width: 200,
      height: 200,
      margin: 10,
    },
  };
  const [width, height] = useDeviceSize();
  const [gridPixelWidth, setGridPixelWidth] = useState(
    width !== 0 ? width : 400
  );
  const [gridPixelHeight, setGridPixelHeight] = useState(
    height !== 0 ? height : 800
  );
  const [gridItems, setGridItems] = useState([]);
  const gridItemsWidth = Math.max(Math.floor(gridPixelWidth / 220), 1);

  useEffect(() => {
    setGridPixelWidth(width);
    setGridPixelHeight(height);
  }, [width, height]);

  useEffect(() => {
    const values = [];

    const flatValues = Object.keys(imageGalleryData)?.flatMap((key) =>
      imageGalleryData?.[key]?.flatMap((value) => `${key}${value}`)
    );
    for (let i = 0; i < flatValues?.length; i += gridItemsWidth) {
      const chunk = flatValues?.slice(i, i + gridItemsWidth);
      values.push(chunk);
    }
    setGridItems(values);
  }, [gridItemsWidth]);

  const ItemRenderer = ({ columnIndex, rowIndex, style }) => {
    return (
      <div
        style={{ ...style, left: Number.parseInt(`${style.left}`) + 100 }}
        key={columnIndex * gridItemsWidth + rowIndex}
      >
        {gridItems?.[rowIndex]?.[columnIndex] && (
          <img
            src={gridItems?.[rowIndex]?.[columnIndex]}
            alt={"Missing Image"}
            style={styles.image}
          />
        )}
      </div>
    );
  };

  return (
    <div style={styles.imageGridWrapper}>
      {gridItems?.length > 0 && (
        <Grid
          style={styles.gridStyle}
          width={gridPixelWidth}
          height={gridPixelHeight}
          columnCount={gridItemsWidth}
          columnWidth={220}
          rowHeight={220}
          rowCount={gridItems?.length}
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
  );
};

export default ImageGridContainer;

// ResponsiveGrid.js
import React, { useState, useEffect } from "react";
import { FixedSizeGrid as Grid } from "react-window";
import "./ResponsiveGrid.module.css"; // Import the CSS file for styling
import LoadingImage from "../common/LoadingImage";
import Tooltip from "../common/Tooltip";

const ResponsiveGrid = ({
  items = [],
  itemWidth = 150,
  itemHeight = 150,
  gridHeight = 500,
}) => {
  const [columnCount, setColumnCount] = useState(
    Math.floor(window.innerWidth / itemWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setColumnCount(Math.floor(window.innerWidth / itemWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [itemWidth]);

  const ItemRenderer = ({ columnIndex, rowIndex, style }) => {
    const value = items?.[rowIndex]?.[columnIndex];
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
        key={columnIndex * itemHeight + rowIndex}
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
    <div className="grid-container">
      <Grid
        columnCount={columnCount}
        columnWidth={itemWidth}
        height={gridHeight}
        rowCount={Math.ceil(items.length / columnCount)}
        rowHeight={itemHeight}
        width={window.innerWidth}
      >
        {ItemRenderer}
      </Grid>
    </div>
  );
};

export default ResponsiveGrid;

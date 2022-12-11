import React, { useEffect } from "react";
import { imageGalleryData } from "../../assets/data/ImageGalleryData";

const ImageGridContainer = () => {
  const styles = {
    imageGridWrapper: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: 50,
    },
    imageWrapper: { border: "1px solid black" },
    image: {
      objectFit: "contain",
      width: 200,
      height: 200,
      margin: 10,
    },
  };

  return (
    <div style={styles.imageGridWrapper}>
      {Object.keys(imageGalleryData)?.map((parentPath, index) =>
        imageGalleryData[parentPath]?.map((childPath, index) => (
          <div style={styles.imageWrapper} key={index}>
            <img
              src={`${parentPath}${childPath}`}
              alt={"Missing Image"}
              style={styles.image}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default ImageGridContainer;

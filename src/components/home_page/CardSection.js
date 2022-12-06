import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import TimelineIcon from "@mui/icons-material/Timeline";
import Card from "../common/Card";

const CardSection = () => {
  return (
    <div
      style={{
        height: "fit-content",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        flexWrap: "wrap",
      }}
    >
      <Card
        icon={<CameraAltIcon sx={{ fontSize: 50 }} />}
        title={"More Images"}
        description={"The cast has 2 main protagonists: Anna and Zac"}
        link={"/more_images"}
      />
      <Card
        icon={<LocationOnIcon sx={{ fontSize: 50 }} />}
        title={"Location"}
        description={"This Drama takes place in the 21st century USA"}
        link={"/"}
      />
      <Card
        icon={<ContactPageIcon sx={{ fontSize: 50 }} />}
        title={"Intro"}
        description={
          "These two love birds find a way to make it through anything together"
        }
        link={"/"}
      />
      <Card
        icon={<TimelineIcon sx={{ fontSize: 50 }} />}
        title={"Timeline"}
        description={"View the history of the Drama 💝💝💝💝💝💝"}
        link={"/timeline"}
        cardColor={"pink"}
      />
    </div>
  );
};

export default CardSection;

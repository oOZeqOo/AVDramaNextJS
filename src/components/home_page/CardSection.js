import React from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactPageIcon from "@mui/icons-material/ContactPage";
import TimelineIcon from "@mui/icons-material/Timeline";
import Card from "../common/Card";
import { FadeInAnimation } from "../utils/Animations";

const CardSection = () => {
  const getAnimatedCard = (
    icon,
    title,
    description,
    link,
    cardColor,
    transition
  ) => (
    <FadeInAnimation transition={transition}>
      <Card
        icon={icon}
        title={title}
        description={description}
        link={link}
        cardColor={cardColor}
      />
    </FadeInAnimation>
  );

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
      {getAnimatedCard(
        <CameraAltIcon sx={{ fontSize: 50 }} />,
        "More Images",
        "The cast has 2 main protagonists: Anna and Zac",
        "/more_images",
        "",
        0.5
      )}
      {getAnimatedCard(
        <LocationOnIcon sx={{ fontSize: 50 }} />,
        "Location",
        "This Drama takes place in the 21st century USA",
        "#secret",
        "",
        0.5
      )}
      {getAnimatedCard(
        <ContactPageIcon sx={{ fontSize: 50 }} />,
        "Intro",
        "These two love birds find a way to make it through anything together",
        "#info-section",
        "",
        0.5
      )}
      {getAnimatedCard(
        <TimelineIcon sx={{ fontSize: 50 }} />,
        "Timeline",
        "View the history of the Drama 💝💝💝💝💝💝",
        "/timeline",
        "pink",
        0.5
      )}
    </div>
  );
};

export default CardSection;

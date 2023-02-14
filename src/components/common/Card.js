import React from "react";
import MUICard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Card = ({
  icon,
  title,
  description,
  link,
  cardColor = "white",
  textColor = "black",
}) => {
  return (
    <MUICard
      sx={{ maxWidth: 250, height: 300, margin: 5, borderRadius: 10 }}
      style={{
        backgroundColor: cardColor,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Link
        href={link}
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ margin: 50 }}>{icon}</div>
        <CardContent style={{ flex: 1 }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{ color: textColor }}
          >
            {title}
          </Typography>
          <Typography variant="body2" style={{ color: textColor }}>
            {description}
          </Typography>
        </CardContent>
      </Link>
    </MUICard>
  );
};

export default Card;

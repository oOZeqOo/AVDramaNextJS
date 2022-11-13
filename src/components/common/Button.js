import React from "react";
import { IconButton as MUIIconButton } from "@mui/material";

const IconButton = (props) => {
  const { children, ...rest } = props;

  return <MUIIconButton {...rest}>{children}</MUIIconButton>;
};

export default IconButton;

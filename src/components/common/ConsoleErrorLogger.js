import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";

const EXCLUDE_ERRORS = ["Warning"];

const ConsoleErrorLogger = (props) => {
  const { children } = props;
  const [error, setError] = useState(null);

  return <>{children}</>;
};

export default ConsoleErrorLogger;

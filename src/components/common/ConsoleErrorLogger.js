import React, { useState, useEffect } from "react";
import { Snackbar } from "@mui/material";

const EXCLUDE_ERRORS = ["Warning"];

const ConsoleErrorLogger = (props) => {
  const { children } = props;
  const [error, setError] = useState(null);

  //   useEffect(() => {
  //     const originalConsoleError = console.error;
  //     console.error = (error) => {
  //       console.log(error);
  //       console.log(error);
  //       if (!EXCLUDE_ERRORS?.reduce((a, b) => error?.includes(a) || b, false))
  //         return;
  //       setError(error);
  //       originalConsoleError(error);
  //     };
  //     return () => {
  //       console.error = originalConsoleError;
  //     };
  //   }, []);

  //   const handleClose = () => {
  //     setError(null);
  //   };

  return (
    <>
      {children}
      {/* <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!error}
        onClose={handleClose}
        message={error && error.toString()}
      /> */}
    </>
  );
};

export default ConsoleErrorLogger;

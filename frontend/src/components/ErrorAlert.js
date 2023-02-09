import React, { useEffect, useState } from "react";
import { Alert, AlertTitle } from "@mui/material";




export default function ErrorAlert(props) {
  const [errorMessage, setErrorMessage] = useState(props.errorMessage);
  useEffect(() => {
    if (props.errorMessage) {
      setErrorMessage(props.errorMessage);
    }
  }, [props.errorMessage])

  const handleClose = () => {
    setErrorMessage(null);
    props.errorMessage = null;
  };

  return (
    <div>
      {errorMessage && (
        <Alert severity="error" onClose={handleClose}>
          <AlertTitle>Hata</AlertTitle>
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
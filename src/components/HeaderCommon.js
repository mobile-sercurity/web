import { Box, Button } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";

const HeaderCommon = (props) => {
  const { handleClickBtn, title } = props;

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<KeyboardDoubleArrowLeftIcon />}
        onClick={handleClickBtn}
      >
        Trở lại
      </Button>

      <h3 style={{ marginTop: "1rem" }} className="mb-4 title">
        {title}
      </h3>
    </Box>
  );
};

export default HeaderCommon;

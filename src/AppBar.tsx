import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  display: "none",
  [theme.breakpoints.up("sm")]: {
    display: "block"
  }
}));

export default function ApplicationBar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <StyledTypography variant="h6" noWrap>
          Smarkets App
        </StyledTypography>
      </Toolbar>
    </AppBar>
  );
}

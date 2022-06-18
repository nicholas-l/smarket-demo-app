import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core/styles";

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

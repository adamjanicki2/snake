import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { Button, DialogActions } from "@mui/material";
import { Settings } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

class Help extends React.Component {
  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle>
          How to Play Snake
          <IconButton
            onClick={this.props.close}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography
            style={{
              fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"'],
            }}
          >
            I've built a version of the classic JavaScript Snake game! Follow
            these instructions to play!
            <ol>
              <li>
                Press any arrow key to get started; then use the arrow keys to
                navigate the board and eat as many apples as possible to get the
                highest score!
              </li>
              <li>
                Adjust your settings by clicking on the <Settings /> icon in the
                top left corner. You can adjust things like speed, background
                color, snake color, and whether or not you'd like to use walls
                or not.
              </li>
            </ol>
            Have fun! <br /> -Adam
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.props.close}
            variant="outlined"
            style={{
              textTransform: "none",
              fontFamily: ["-apple-system", "BlinkMacSystemFont", '"Segoe UI"'],
              marginTop: "8px",
              backgroundColor: "#F4F4F4",
            }}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default Help;

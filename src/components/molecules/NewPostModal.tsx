import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const style = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type Props = {
  open: boolean;
  handleClose: () => void;
  onClickSubmit: () => void;
  newPost: string;
  onChangeNewPost: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const NewPostModal: FC<Props> = (props) => {
  const { open, handleClose, onClickSubmit, newPost, onChangeNewPost } = props;
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Grid container>
          <Grid item xs={10}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              sx={{ pb: 2 }}
            >
              New Post
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={handleClose} sx={{ m: 0, p: 0 }}>
              <CloseIcon />
            </Button>
          </Grid>
        </Grid>
        <TextField
          id="new-post"
          label="Post"
          variant="outlined"
          multiline={true}
          rows="6"
          fullWidth={true}
          value={newPost}
          onChange={onChangeNewPost}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" onClick={onClickSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default NewPostModal;

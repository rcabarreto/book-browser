import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

interface IModalProps {
  open: boolean;
  image: string;
  handleClose: any;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
};

const BookModal: React.FC<IModalProps> = ({ open, image, handleClose }) => {
  return (
    <Modal open={open} onClose={handleClose} closeAfterTransition>
      <Fade in={open} timeout={500} style={{ outline: "none" }}>
        <Box sx={style}>
          <img src={image} alt="asd" className="clickable" />
        </Box>
      </Fade>
    </Modal>
  );
};

export default BookModal;

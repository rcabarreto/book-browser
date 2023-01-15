import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import BookModal from "../BookModal";

import { BookType } from "../../../types";

const GalleryView: React.FC<{ bookList: BookType[] }> = ({ bookList }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState("");

  const handleOpen = (image: string) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  return (
    <Grid container spacing={4}>
      {bookList.map((book, i) => (
        <Grid
          item
          key={`book-${book.title}-${book.key}-${i}`}
          xs={12}
          sm={6}
          md={3}
        >
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={() =>
              handleOpen(
                `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
              )
            }
            className="clickable"
          >
            <CardMedia
              component="img"
              image={`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              alt="Book cover"
              sx={{ height: "280px" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography gutterBottom variant="h5" component="h2">
                {book.title}
              </Typography>
              <Typography>
                {!!book.author_name && book.author_name.join(", ")}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">View</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}

      <BookModal
        open={modalOpen}
        image={modalImage}
        handleClose={handleClose}
      />
    </Grid>
  );
};

export default GalleryView;

import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import BookModal from "../BookModal";

import { BookType } from "../../../types";

const ListViewItem: React.FC<{
  book: BookType;
  onClick: (image: string) => void;
}> = ({ book, onClick }) => {
  return (
    <TableRow>
      <TableCell>
        <img
          src={`http://covers.openlibrary.org/b/id/${book.cover_i}-S.jpg`}
          alt={book.title}
          onClick={() =>
            onClick(`http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`)
          }
          style={{ cursor: "pointer" }}
        />
      </TableCell>
      <TableCell>{book.title}</TableCell>
      <TableCell>{!!book.author_name && book.author_name.join(", ")}</TableCell>
      <TableCell>{book.first_publish_year}</TableCell>
      <TableCell align="right">{!!book.isbn && book.isbn[0]}</TableCell>
    </TableRow>
  );
};

const ListView: React.FC<{ bookList: BookType[] }> = ({ bookList }) => {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalImage, setModalImage] = React.useState("");

  const handleOpen = (image: string) => {
    setModalImage(image);
    setModalOpen(true);
  };

  const handleClose = () => setModalOpen(false);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "2px solid black",
                "& th": {
                  fontWeight: "bold",
                },
              }}
            >
              <TableCell></TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Author</TableCell>
              <TableCell>First publication year</TableCell>
              <TableCell align="right">ISBN</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookList.map((book, i) => (
              <ListViewItem
                key={`book-${book.title}-${book.key}-${i}`}
                book={book}
                onClick={handleOpen}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <BookModal
        open={modalOpen}
        image={modalImage}
        handleClose={handleClose}
      />
    </>
  );
};

export default ListView;

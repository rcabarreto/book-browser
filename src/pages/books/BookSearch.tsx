import React, { ChangeEvent } from "react";
import { debounce } from "lodash";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

interface IBookSearch {
  value: string | null;
  onChange: (event: string) => void;
  onSubmit: () => void;
}

const BookSearch: React.FC<IBookSearch> = ({ value, onChange, onSubmit }) => {
  const handleInputChange = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    onChange(event.target.value);
  };

  const debouncedChangeHandler = debounce(handleInputChange, 500);

  return (
    <Container maxWidth="sm">
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Book search
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        Something about the book search.
      </Typography>

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for Books"
          inputProps={{ "aria-label": "Search for Books" }}
          onChange={debouncedChangeHandler}
        />
        <IconButton
          onSubmit={onSubmit}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </Container>
  );
};

export default BookSearch;

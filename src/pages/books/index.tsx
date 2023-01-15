/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";

import { useAppDispatch } from "../../hooks";
import { searchBooks } from "./booksSlice";
import BookSearch from "./BookSearch";
import BookSearchResults from "./BookSearchResults";

const Books: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string | null>(null);

  useEffect(() => {
    doSearch();
  }, [searchString]);

  const doSearch = () => {
    if (!!searchString) {
      dispatch(searchBooks(searchString));
    }
  };

  return (
    <Box
      sx={{
        pt: 8,
        pb: 2,
        backgroundColor: (theme) => theme.palette.grey[100],
      }}
    >
      <BookSearch
        value={searchString}
        onChange={(value) => setSearchString(value)}
        onSubmit={doSearch}
      />
      <BookSearchResults />
    </Box>
  );
};

export default Books;

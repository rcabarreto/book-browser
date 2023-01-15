import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import GalleryView from "./GalleryView";
import ListView from "./ListView";

import Loading from "../../components/Loading";

import { useAppSelector } from "../../hooks";
import { selectBooks, selectIsLoading } from "./booksSlice";
import { BookType } from "../../types";

const BookSearchResults: React.FC = () => {
  const [pageSize, setPageSize] = React.useState<number>(12);
  const [viewMode, setViewMode] = React.useState<"list" | "gallery">("gallery");
  const [currentPage, setCurrentPage] = React.useState<number>(1);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [pageSize]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleChangeViewMode = (
    event: React.MouseEvent<HTMLElement>,
    nextView: "list" | "gallery"
  ) => {
    if (nextView !== null) {
      setViewMode(nextView);
    }
  };

  const handleChangePageSize = (event: SelectChangeEvent) => {
    setPageSize(parseInt(event.target.value, 10));
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  const bookList: BookType[] = useAppSelector(selectBooks);
  const isLoading: boolean = useAppSelector(selectIsLoading);

  const pageCount = Math.ceil(bookList.length / pageSize);

  const pageBooks = bookList.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (isLoading) {
    return (
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Loading />
      </Container>
    );
  }

  return (
    <Container sx={{ py: 8 }} maxWidth="lg">
      {!!bookList.length && (
        <>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ pb: 3 }}
          >
            <Grid item>
              <Typography variant="h5">Books: </Typography>
            </Grid>
            <Grid item>
              <FormControl sx={{ mx: 2, minWidth: 120 }} size="small">
                <InputLabel id="type-select-label">Page size</InputLabel>
                <Select
                  labelId="type-select-label"
                  id="type-select-label"
                  value={`${pageSize}`}
                  label="Page size"
                  onChange={handleChangePageSize}
                >
                  <MenuItem value={12}>12</MenuItem>
                  <MenuItem value={24}>24</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                </Select>
              </FormControl>
              <ToggleButtonGroup
                size="small"
                value={viewMode}
                exclusive
                onChange={handleChangeViewMode}
              >
                <ToggleButton value="list" aria-label="list">
                  <ViewListIcon />
                </ToggleButton>
                <ToggleButton value="gallery" aria-label="gallery">
                  <ViewModuleIcon />
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
          </Grid>

          {viewMode === "list" ? (
            <ListView bookList={pageBooks} />
          ) : (
            <GalleryView bookList={pageBooks} />
          )}

          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ mt: 6 }}
          >
            <Grid item xs={3}>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChangePage}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default BookSearchResults;

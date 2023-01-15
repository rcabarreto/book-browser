import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import Api from "../../services/Api";
import { BookType } from "../../types";
import { createBook } from "../../utils";

export interface IBooksState {
  loading: boolean;
  list: BookType[];
}

const initialState: IBooksState = {
  loading: false,
  list: [],
};

export const searchBooks = createAsyncThunk(
  "books/search",
  async (searchString: string) => {
    const api = new Api();
    const response: any = await api.searchBooksByTitle(searchString);
    return response;
  }
);

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchBooks.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchBooks.fulfilled, (state, action) => {
      state.list = action.payload.map((book: BookType) => {
        return createBook(book);
      });
      state.loading = false;
    });
  },
});

export const selectIsLoading = (state: RootState) => state.books.loading;
export const selectBooks = (state: RootState) => state.books.list;

export default bookSlice.reducer;

import { BookType } from "../types";

export const createBook = (book: BookType) => {
  const {
    title,
    author_name,
    isbn,
    edition_count,
    cover_i,
    has_fulltext,
    first_publish_year,
  } = book;

  return {
    title,
    author_name,
    isbn,
    edition_count,
    cover_i,
    has_fulltext,
    first_publish_year,
  };
};

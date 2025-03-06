import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';

@Injectable({ providedIn: 'root' })
export class BookService {
  // This is the current book status
  private bookList: Book[] = [];
  private BOOK_KEY = 'BOOK_KEY';

  // Initialization
  constructor() {
    this.bookList = this.getLocalBooks();
  }

  // This function returns the book list
  getBooks() {
    return [...this.bookList];
  }

  // This function fetches the book list and provides it
  getLocalBooks() {
    const data = localStorage.getItem(this.BOOK_KEY);
    return data ? JSON.parse(data) : [];
  }

  // This function sets the books
  setLocalBooks(data: Book[]) {
    localStorage.setItem(this.BOOK_KEY, JSON.stringify(data));
  }

  // This function pushes a new book
  addBook(book: Book) {
    this.bookList.push(book);
    this.setLocalBooks(this.bookList);
  }

  // This function edits a particular book
  editBook(editedBook: Book) {
    this.bookList = this.bookList.map((book: Book) => {
      if (book.id === editedBook.id) {
        return {
          ...book,
          ...editedBook,
        };
      } else return book;
    });

    this.setLocalBooks(this.bookList);
  }

  // this function deletes a book
  deleteBook(id: string) {
    this.bookList = this.bookList.filter((book) => book.id !== id);
    this.setLocalBooks(this.bookList);

    return this.getBooks();
  }
}

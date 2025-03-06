import { Injectable } from '@angular/core';
import { Book } from '../Models/Book';
import { map, tap, timer } from 'rxjs';

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
  addBook(title: string, author: string, isbn: string) {
    return timer(2000).pipe(
      map(() => {
        this.bookList.push(new Book(title, author, isbn, true));
        this.setLocalBooks(this.bookList);
      })
    );
  }

  // Toggle Book Availibility
  toggleBookAvailibility(id: string) {
    // Mocking a api call
    return timer(2000).pipe(
      map(() => {
        return this.bookList.map((book) =>
          book.id === id ? { ...book, availability: !book.availability } : book
        );
      }),
      tap((bookList: Book[]) => {
        this.bookList = bookList;
        return bookList;
      })
    );
  }

  getBookById(id: string) {
    return this.bookList.find((book) => book.id === id);
  }

  // This function edits a particular book
  editBook(id: string, title: string, author: string, isbn: string) {
    return timer(2000).pipe(
      map(() => {
        this.bookList = this.bookList.map((book: Book) =>
          book.id === id ? { ...book, title, author, isbn } : book
        );

        this.setLocalBooks(this.bookList);
      })
    );
  }

  // this function deletes a book
  deleteBook(id: string) {
    return timer(2000).pipe(
      map(() => {
        this.bookList = this.bookList.filter((book) => book.id !== id);
        this.setLocalBooks(this.bookList);
        return this.getBooks();
      })
    );
  }
}

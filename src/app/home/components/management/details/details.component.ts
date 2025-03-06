import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/Models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  // This contains the book list locally
  bookList: Book[] = [];

  // Injecting the necessary dependencies
  constructor(private bookService: BookService) {}

  // Initializing the book list
  ngOnInit(): void {
    this.bookList = this.bookService.getBooks();
  }

  // This function is invoked when the edit button is clicked
  onEditClick(id: string) {}

  // This function is invoked when the delete button is clicked
  onDeleteClick(id: string) {
    this.bookList = this.bookService.deleteBook(id);
  }
}

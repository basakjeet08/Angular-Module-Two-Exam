import { Component } from '@angular/core';
import { Book } from 'src/app/Models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent {
  // This contains the book list locally
  bookList: Book[] = [];

  // Loading and error state
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(private bookService: BookService) {}

  // Initializing the book list
  ngOnInit(): void {
    this.bookList = this.bookService.getBooks();
  }

  // This function toggle the book availibility
  toggleBookAvailibility(id: string) {
    // Setting Loading State
    this.isLoading = true;

    this.bookService.toggleBookAvailibility(id).subscribe({
      next: (bookList: Book[]) => {
        this.isLoading = false;
        this.bookList = bookList;
      },

      error: (error: Error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/shared/Models/Book';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  // This contains the book list locally
  bookList: Book[] = [];

  // Various States for loading and error
  isLoading: boolean = false;
  errorMessage: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Initializing the book list
  ngOnInit(): void {
    this.bookList = this.bookService.getBooks();
  }

  // This function is invoked when the edit button is clicked
  onEditClick(id: string) {
    this.router.navigate(['../', 'add'], {
      relativeTo: this.route,
      queryParams: { id: id },
    });
  }

  // This function is invoked when the delete button is clicked
  onDeleteClick(id: string) {
    // Setting the loading State
    this.isLoading = true;

    this.bookService.deleteBook(id).subscribe({
      next: (bookList) => {
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

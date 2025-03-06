import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/shared/services/book.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  // This is the user input book details
  userInput = {
    title: '',
    author: '',
    isbn: '',
  };

  // States for loading and error
  isLoading: boolean = false;
  errorMessage: string | null = null;

  isEdit: boolean = false;
  bookId: string | null = null;

  // Injecting the necessary dependencies
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.queryParams['id'];

    if (id) {
      const bookFound = this.bookService.getBookById(id);

      if (bookFound) {
        this.isEdit = true;
        this.bookId = id;

        this.userInput.title = bookFound.title;
        this.userInput.author = bookFound.author;
        this.userInput.isbn = bookFound.isbn;
      } else {
        alert('Provided Id is wrong !!');
        this.router.navigate(['../', 'details'], { relativeTo: this.route });
      }
    }
  }

  // This function is invoked when the user clicks on the add button
  onAddClick() {
    // Setting the loading state
    this.isLoading = true;

    const observer = this.isEdit
      ? this.bookService.editBook(
          this.bookId!,
          this.userInput.title,
          this.userInput.author,
          this.userInput.isbn
        )
      : this.bookService.addBook(
          this.userInput.title,
          this.userInput.author,
          this.userInput.isbn
        );

    // Handling the response
    observer.subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['../', 'details'], { relativeTo: this.route });
        this.router.navigate(['../', 'details'], { relativeTo: this.route });
      },

      error: (error: Error) => {
        this.isLoading = true;
        this.errorMessage = error.message;
      },
    });
  }

  // This funciton is invoked when the user clicks cancel
  onCancelClick() {
    this.router.navigate(['../', 'details'], { relativeTo: this.route });
  }
}

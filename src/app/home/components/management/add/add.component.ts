import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Models/Book';
import { BookService } from 'src/app/services/book.service';

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
      }
    }
  }

  // This function is invoked when the user clicks on the add button
  onAddClick() {
    if (this.isEdit) {
      this.bookService.editBook(
        this.bookId!,
        new Book(
          this.userInput.title,
          this.userInput.author,
          this.userInput.isbn
        )
      );
    } else {
      this.bookService.addBook(
        new Book(
          this.userInput.title,
          this.userInput.author,
          this.userInput.isbn,
          false
        )
      );
    }

    this.router.navigate(['../', 'details'], { relativeTo: this.route });
  }

  // This funciton is invoked when the user clicks cancel
  onCancelClick() {
    this.router.navigate(['../', 'details'], { relativeTo: this.route });
  }
}

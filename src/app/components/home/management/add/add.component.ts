import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/Models/Book';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent {
  // This is the user input book details
  userInput = {
    title: '',
    author: '',
    isbn: '',
  };

  // Injecting the necessary dependencies
  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This function is invoked when the user clicks on the add button
  onAddClick() {
    this.bookService.addBook(
      new Book(
        this.userInput.title,
        this.userInput.author,
        this.userInput.isbn,
        false
      )
    );

    this.router.navigate(['../', 'details'], { relativeTo: this.route });
  }

  // This funciton is invoked when the user clicks cancel
  onCancelClick() {
    this.router.navigate(['../', 'details'], { relativeTo: this.route });
  }
}

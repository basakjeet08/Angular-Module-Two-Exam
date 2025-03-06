import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    this.router.navigate(['../', 'add', id], { relativeTo: this.route });
  }

  // This function is invoked when the delete button is clicked
  onDeleteClick(id: string) {
    this.bookList = this.bookService.deleteBook(id);
  }
}

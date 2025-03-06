import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
})
export class ManagementComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  // This function is invoked when the add book button is clicked
  onAddClick() {
    this.router.navigate(['add', ''], { relativeTo: this.route });
  }
}

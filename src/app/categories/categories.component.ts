import {Component, OnInit} from '@angular/core';
import {Category} from "../category";
import {CategoryService} from "../category.service";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories()
      .subscribe(categories => {
        categories.forEach(
          c => {
            this.categoryService.getCategoryImage(c.name)
              .subscribe(image => c.image = image);
          }
        );
        return this.categories = categories;
      });
  }

}

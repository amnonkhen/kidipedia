import {Component, OnInit, Input} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

import {Category} from "../category";
import {CategoryService} from "../category.service";
import {combineLatest} from "rxjs";


@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css']
})
export class CategoryDetailComponent implements OnInit {

  @Input() category: Category;


  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.getCategory();
  }


  private getCategory() {
    const id = this.route.snapshot.paramMap.get('id');

    const combined = combineLatest(
      this.categoryService.getCategory(id),
      this.categoryService.getPagesInCategory(id),
      this.categoryService.getCategoryImage(id),
    );

    combined.subscribe(latestValues => {
      const [category, pages, image] = latestValues;
      this.category = category;
      this.category.pages = pages;
      this.category.image = image;
    });
  }

  save(): void {
    this.categoryService.updateCategory(this.category)
      .subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }
}

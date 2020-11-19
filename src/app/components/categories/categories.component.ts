import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "src/app/labels/category";
import { CategoryService } from "../../services/category.service";
import { Categories } from "../../state/categories/categories.model";

@Component({
  selector: "app-categories",
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.css", "../../app.component.css"],
})
export class CategoriesComponent {
  currentCategory$: Observable<Categories>;
  categories = [Category.Furniture, Category.Bedroom, Category.Mattresses];

  constructor(private categoryService: CategoryService) {
    this.currentCategory$ = categoryService.getCategory();
  }

  onCategorySelect(category: Categories) {
    this.categoryService.setCategory(category);
  }
}

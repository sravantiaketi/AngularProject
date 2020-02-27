import { Component, OnInit, Input,EventEmitter, Output } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 // recipes: Recipe[] =[new Recipe('A Test Recipe','This is simply a test','https://tse4.mm.bing.net/th?id=OIP.Qyd9bQCh89jq0e7mJ39aZgHaFj&pid=Api')];

  @Input() recipe :Recipe;
  @Input() index :number;

  ngOnInit() {
  }

  

}

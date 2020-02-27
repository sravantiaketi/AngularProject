import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private  recipes: Recipe[] =[new Recipe(
      'A Test Recipe',
      'This is simply a test',
      'https://tse4.mm.bing.net/th?id=OIP.Qyd9bQCh89jq0e7mJ39aZgHaFj&pid=Api'
      ,[
          new Ingredient('Meat',1),
          new Ingredient('French Fries',20)
      ]),
    new Recipe(
        'A Test Recipe 2',
        'This is simply a test 2',
        'https://tse4.mm.bing.net/th?id=OIP.Qyd9bQCh89jq0e7mJ39aZgHaFj&pid=Api',
        [
            new Ingredient('Buns',2),
          new Ingredient('Meat',1) 
        ])];

        constructor(private shopService : ShoppingListService) {
            
        }
    getRecipes(){
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients : Ingredient[]){
        this.shopService.addIngredients(ingredients);
    }
   
     getRecipe(id: number){
         return this.recipes[id];
     }

     addRecipe(recipe : Recipe) {
      this.recipes.push(recipe);
      this.recipesChanged.next( this.recipes.slice());
     }

     updateRecipe(index:number,newRecipe:Recipe) {
      this.recipes[index]=newRecipe;
      this.recipesChanged.next( this.recipes.slice());
     }

     deleteRecipe(index:number){
      this.recipes.splice(index,1);
      this.recipesChanged.next(this.recipes.slice());
     }

     setRecipes(recipes: Recipe[]){
     this.recipes=recipes;
     this.recipesChanged.next(this.recipes.slice());
     }

}
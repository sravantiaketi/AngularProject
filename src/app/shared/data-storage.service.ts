import { Injectable } from "@angular/core";
import {Http,Response} from '@angular/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class DataStorageService {

    constructor(private http: Http,
        private recipeService: RecipeService,
        private authService:AuthService) {

    }

    storeRecipes() {
        const token = this.authService.getToken();
    return  this.http.put('https://ng-recipe-book-268e9.firebaseio.com/recipes.json'+token,
     this.recipeService.getRecipes());
    }

    getRecipes(){
        let tk ='';
       const token = this.authService.getToken();
            
        this.http.get('https://ng-recipe-book-268e9.firebaseio.com/recipes.json?auth='+token).
        subscribe(
            (response : Response) => {
             const recipes: Recipe[] = response.json();
             for(let recipe of recipes) {
                 if(!recipe['ingredients']) {
                    recipe['ingredients']=[];
                 }
             }
             console.log(recipes);
              this.recipeService.setRecipes(recipes);
            }
        );
    }

}
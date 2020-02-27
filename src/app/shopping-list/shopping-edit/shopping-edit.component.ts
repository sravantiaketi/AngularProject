import { Component, OnInit, ViewChild,EventEmitter, Output, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
 // @ViewChild('nameInput') nameInputRef : ElementRef;
 // @ViewChild('amountInput') amountInputRef : ElementRef;
 @ViewChild('f') slForm : NgForm;
 subscription: Subscription;
  editMode = false;
editedItemIndex :number;
editedItem:Ingredient;
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
   this.subscription = this.shoppingListService.startedEditing.subscribe(
     (index: number) => {
       this.editedItemIndex=index;
       this.editMode=true;
       this.editedItem=this.shoppingListService.getIngredient(this.editedItemIndex);
       this.slForm.setValue({
         name: this.editedItem.name,
         amount:this.editedItem.amount

       })
     }
   );
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  onSubmit(form: NgForm){
    const value= form.value;
    //const newIngredient = new Ingredient(this.nameInputRef.nativeElement.value,
    //  this.amountInputRef.nativeElement.value);
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.shoppingListService.updateIngredient(this.editedItemIndex,newIngredient);

    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

//this.shoppingListService.newItemAdded.emit(newIngredient);
   this.editMode=false;
    form.reset();
  }

  onClear(){
   this.slForm.reset();
   this.editMode=false; 
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();

  }

}

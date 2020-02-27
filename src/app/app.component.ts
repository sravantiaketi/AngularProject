import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  title = 'CourseProject';
  loadedFeature ='recipe';

  onNavigate(feature : string){
    this.loadedFeature=feature;

  }
  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyAL8fIHh-Qiep5nyVkU24bzGauVs53gbvA",
      authDomain: "ng-recipe-book-268e9.firebaseapp.com"
    });
  }
}

import { Component, ElementRef, Signal, ViewContainerRef, WritableSignal, computed, signal, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CrudComponent } from "./crud/crud.component";
@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, CrudComponent]
})




export class AppComponent {





  title(title: any) {
    throw new Error('Method not implemented.');
  }


 

  






  
  
}


import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { CrudService } from '../services/crud.service';
import { Curd } from '../model/curd';
import {  NgFor, NgIf } from '@angular/common';
import ValidateForm from '../helpers/validationform';
import { NgToastModule } from 'ng-angular-popup';
import { PopupService } from '../services/popup.service';
import { Observable, Subject } from 'rxjs';


interface crudForm{
  name:FormControl<string>,
  username:FormControl<string>,
  mobile:FormControl<string>
}



@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf,NgToastModule,NgFor],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css'
})

export class CrudComponent implements OnInit {

//declared class members

public show_data:Array<Curd> = [];
public errorMessage:string;
public formState:string =  "saveData";
public updateId:string;


// inject services
  constructor( 
     private popupService:PopupService,
     private http:HttpClient, 
     private formBuilder: FormBuilder,
     private crudService:CrudService
     ) {
  }


  //request data from server before template initialized
  ngOnInit(){
    this.getData();
  }

// Received form data
  crudForm = new FormGroup<crudForm>({
    name:new FormControl('',[Validators.required,Validators.minLength(4)]),
    username: new FormControl('',[Validators.required,Validators.email]),
    mobile:new FormControl('',[Validators.maxLength(10) ,Validators.minLength(10), Validators.required])
  })


  // Validate form input field
  get name(){
    return this.crudForm.get('name');
  }
  get username(){
    return this.crudForm.get('username');
  }
  get mobile() {
    return this.crudForm.get('mobile');
  }


   //request data from server before template initialized
  getData(){
    this.crudService.getAllData().subscribe(
      {
        next:(data:Curd[])=>{
          this.show_data = data;
          this.errorMessage = '';
        },
        error:(error)=>{
          this.errorMessage = error.error.error;
          // this.popupService.showError(this.errorMessage);
        }
      }
    )
  }


  // edit item with patchValue 
   async editTask(id:string){
  const currentData = await this.show_data.filter((data)=>{
  return data._id == id;
  })
  this.updateId = currentData[0]._id;
  this.formState = "updateData";
  this.crudForm.patchValue({
    name:currentData[0].name,
    username:currentData[0].username,
    mobile:currentData[0].mobile
  })
  }

  trackByItems(index: number, item:Curd): string {
    return item._id;
  }


  // delete item by id 
  deleteTask(id:string){
 this.crudService.deleteDataById(id).subscribe({
  next:(data:Curd)=>{
    this.popupService.showSuccess("Data deleted successfully !");
    this.show_data = this.show_data.filter(item=> item._id != id);
    this.getData();
  },
  error:(error)=>{
     this.popupService.showError(error.error.message);
  }
 })
  }
 



  saveData() {
    if(this.crudForm.valid){
      let  observable:Observable<any>;
      if(this.formState=="saveData"){
        alert("saving");
      observable =   this.crudService.createData(this.crudForm.value as Curd);
      }else{
        alert('updating');
       observable =  this.crudService.updateData(this.updateId,this.crudForm.value as Curd);
      }
   
      observable.subscribe({
       next:(data)=>{
         this.crudForm.reset();
         this.popupService.showSuccess(this.formState=="saveData" ? "Record created successfully !" : "Record updated successfully !");
         this.getData();
         this.formState = "saveData";
       },
       error:(error)=>{
         this.crudForm.reset();
         this.popupService.showError(error.error.message);
       }
      })
    }else {
      this.popupService.showError("All fields are required !");
      ValidateForm.ValidateAllFormFields(this.crudForm);
    }
   }


 

}

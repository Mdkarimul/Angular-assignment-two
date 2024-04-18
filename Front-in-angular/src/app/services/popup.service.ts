import { Injectable } from '@angular/core';
import { NgToastService } from 'ng-angular-popup';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private toastService:NgToastService,) { }

  showSuccess(message:string) {
    this.toastService.success({detail:"SUCCESS",summary:message,duration:5000});
  }
  
  showError(message:string) {
    this.toastService.error({detail:"ERROR",summary:message,sticky:true,duration:5000});
  }

  showInfo() {
    this.toastService.info({detail:"INFO",summary:'Your Info Message',sticky:true});
  }

  // showWarn() {
  //   this.toast.warn({detail:"WARN",summary:'Your Warn Message',duration:'5000'});
  // }

}

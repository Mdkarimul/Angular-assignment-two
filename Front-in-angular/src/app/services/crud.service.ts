import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curd } from '../model/curd';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http:HttpClient,) { }


private url = 'http://localhost:3000';
  createData(data:Curd){
   return this.http.post<Curd>(this.url+'/crud',data);
  }

  getAllData():Observable<Curd[]>{
   return this.http.get<Curd[]>(this.url+'/crud');
  }
  deleteDataById(id:string):Observable<{}>{
    return this.http.delete<{}>(this.url+"/crud/"+id);
  }
  updateData(id:string,data:Curd):Observable<Curd>{
    return this.http.put<Curd>(this.url+"/crud/"+id,data);
  }


}

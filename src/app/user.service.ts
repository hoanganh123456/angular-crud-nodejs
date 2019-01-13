import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseURL = 'http://localhost:8080';
  post = (data) => {
    let urlSave = this.http.post(this.baseURL + '/api/SaveUser',data);
    return urlSave;
  }
  get = () => {
    let urlGet = this.http.get(this.baseURL + '/api/getUser');
    return urlGet;
  }
  update = (data) => {
    let urlUpdate = this.http.post(this.baseURL + '/api/UpdateUser',data);
    return urlUpdate;
  }
  delete = (id) => {
    let urlUpdate = this.http.post(this.baseURL + '/api/deleteUser',id);
    return urlUpdate;
  }
}

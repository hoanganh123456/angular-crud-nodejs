import { Component, OnInit, TemplateRef  } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  modalRef: BsModalRef;
  user: User = new User();
  errorMsg: ErrorMsg = new ErrorMsg();
  users: any;
  editUser: any;
  id= { id : ''};
  constructor(private modalService: BsModalService, private UserService: UserService) { }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalEdit(template: TemplateRef<any>,user) {
    this.modalRef = this.modalService.show(template);
    this.editUser = user;
  }
  openModalDelete(template: TemplateRef<any>,id) {
    this.modalRef = this.modalService.show(template);
    this.id.id = id;
    console.log(this.id.id);
    
  }
  

  onSave() { 
    this.errorMsg.name = this.errorMsg.address = "";
    this.user.name ? '' : this.errorMsg.name = "Name require";
    this.user.address ? '' : this.errorMsg.address = "Address require";
    if (!this.user.name || !this.user.address) {
      return;
    }
    this.UserService.post(this.user).subscribe( data =>{
      this.getUser();
      this.modalRef.hide();
      this.user.name = this.user.address = "";
    },error => {
      console.log(error);
    })
  }
  onUpdate() {
    console.log(this.editUser);
    
    this.UserService.update(this.editUser).subscribe( data =>{
      console.log(data);
      
      this.getUser();
      this.modalRef.hide();
    },error => {
      console.log(error);
    })
  }

  onDelete() {
    this.UserService.delete(this.id.id).subscribe( data =>{
      this.getUser();
      this.modalRef.hide();
    },error => {
      console.log(error);
    })
  }
  
  getUser() {
    this.UserService.get().subscribe(data => {
      this.users = data;
    })
  }

  ngOnInit() {
    this.getUser();
  }

}

class User {
  name: string;
  address: string;
}
class ErrorMsg {
  name: string;
  address: string;
}

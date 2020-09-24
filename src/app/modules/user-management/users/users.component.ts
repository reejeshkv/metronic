import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { UserService } from '../user.service';
import { UCUsersModel } from '../_models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [MessageService],
})
export class UsersComponent implements OnInit {

  users: UCUsersModel[];

  statuses: SelectItem[];

  clonedUsers: { [s: string]: UCUsersModel; } = {};

  constructor(private userService: UserService, private messageService: MessageService) { }

  ngOnInit() {
      this.userService.getUsers().subscribe(data => this.users = data);
      this.statuses = [{label: 'Active', value: 'Active'},{label: 'Pending', value: 'Pending'}]
  }

  onRowEditInit(user: UCUsersModel) {
      this.clonedUsers[user.id] = {...user};
  }

  onRowEditSave(user: UCUsersModel) {
      // if (user.price > 0) {
      //     delete this.clonedUsers[product.id];
      //     this.messageService.add({severity:'success', summary: 'Success', detail:'Product is updated'});
      // }  
      // else {
      //     this.messageService.add({severity:'error', summary: 'Error', detail:'Invalid Price'});
      // }
      delete this.clonedUsers[user.id];
      this.userService.saveUsers(user).subscribe( response => {
        if(response.status === 'success') {
          this.messageService.add({severity:'success', summary: 'Success', detail:'User updated'});
        }
      });
      

  }

  onRowEditCancel(user: UCUsersModel, index: number) {
      this.users[index] = this.clonedUsers[user.id];
      //delete this.users[user.id];
  }

}
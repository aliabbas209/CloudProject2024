import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IInfiniteScrollEvent } from 'ngx-infinite-scroll';
import { User, UsersResponse } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css'],
})
export class ViewUsersComponent implements OnInit {
  usersResponse?: UsersResponse;
  user?: User;
  pageNumber = 0;
  loading = false;

  constructor(
    private userService: UserService,
    private modalService: NgbModal
  ) {}
  ngOnInit(): void {
    this.loadPaginatedUsers(0);
  }

  private loadPaginatedUsers(
    pageNumber = 0,
    pageSize = 10,
    sortBy = 'name',
    sortDir = 'asc'
  ) {
    this.loading = true;
    this.userService.getUsers(pageNumber, pageSize, sortBy, sortDir).subscribe({
      next: (usersResponse) => {
        if (usersResponse.pageNumber > 0) {
          this.usersResponse = {
            ...usersResponse,
            content: [...this.usersResponse!.content, ...usersResponse.content],
          };
        } else {
          this.usersResponse = usersResponse;
          console.log(this.usersResponse);
        }
        this.loading = false;
        console.log(usersResponse);
      },
      error: (error) => {
        console.log(error);
        this.loading = false;
      },
    });
  }

  openUserModal(content: any, user: User) {
    this.user = user;
    this.modalService.open(content, {
      size: 'lg',
    });
  }

  userScrolled(event: IInfiniteScrollEvent) {
    console.log(event);
    if (this.loading || this.usersResponse?.lastPage) {
      return;
    }

    ///load the data of other pages
    this.pageNumber += 1;
    this.loadPaginatedUsers(this.pageNumber);
  }
}

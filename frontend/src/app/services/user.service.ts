import { Injectable } from '@angular/core';
import { User, UsersResponse } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  // signup logic
  signupUser(user: User) {
    return this.httpClient.post<User>(`${environment.apiUrl}/users`, user);
  }

  getUserImageUrl(userId: string) {
    return `${
      environment.apiUrl
    }/users/image/${userId}?${new Date().getTime()}`;
  }

  // get all users
  getUsers(pageNumber = 0, pageSize = 10, sortBy = 'name', sortDir = 'asc') {
    return this.httpClient.get<UsersResponse>(
      `${environment.apiUrl}/users?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=${sortBy}&sortDir=${sortDir}`
    );
  }

  // get single user
  getUser(userId: string) {
    return this.httpClient.get(`${environment.apiUrl}/users/${userId}`);
  }

  // update user
  updateUser(user: User) {
    return this.httpClient.put<User>(
      `${environment.apiUrl}/users/${user.userId}`,
      user
    );
  }

  // delete  user
  deleteUser(userId: string) {
    return this.httpClient.delete(`${environment.apiUrl}/users/${userId}`);
  }

  //get user  by email id
  getUserByEmailId(emailId: string) {
    return this.httpClient.get(`${environment.apiUrl}/users/email/${emailId}`);
  }

  // uplaod user image
  uploadUserImage(userId: string, userImage: File) {
    let formData = new FormData();
    formData.append('userImage', userImage);
    return this.httpClient.post(
      `${environment.apiUrl}/users/image/${userId}`,
      formData
    );
  }

  // search user
  searchUser(query: String) {
    return this.httpClient.get(`${environment.apiUrl}/users/search/${query}`);
  }
}

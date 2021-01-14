import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isUserAuthenticate: boolean = true;
  private _userId = "abc";

  get isUserAuthenticated() {
    return this.isUserAuthenticate;
  }

  get userId() {
    return this._userId;
  }

  constructor() {}

  login() {
    this.isUserAuthenticate = true;
  }

  logout() {
    this.isUserAuthenticate = false;
  }
}

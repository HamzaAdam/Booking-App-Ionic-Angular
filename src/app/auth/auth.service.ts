import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isUserAuthenticate: boolean = true;

  get isUserAuthenticated() {
    return this.isUserAuthenticate;
  }

  constructor() {}

  login() {
    this.isUserAuthenticate = true;
  }

  logout() {
    this.isUserAuthenticate = false;
  }
}

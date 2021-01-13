import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { IonInput, LoadingController } from "@ionic/angular";
import { AuthService } from "./auth.service";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  //isLoading = false;
  isLogin = true;

  constructor(
    private authSer: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    //    this.isLoading = true;
    this.authSer.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging In...." })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          // this.isLoading = false;
          loadingEl.dismiss();
          this.router.navigateByUrl("/places/tabs/discover");
        }, 2000);
      });
    console.log(this.authSer.isUserAuthenticated);
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.isLogin) {
      //send the request to login server
    } else {
      //send the request to sign up server
    }
    console.log(form.value.email, form.value.password);
  }

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }
}

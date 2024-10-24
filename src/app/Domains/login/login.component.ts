import { LoginModel } from './../../Models/login.model';
import { Component, inject } from '@angular/core';
import { TokenService } from '../../Service/token.service';
import { LoginService } from '../../Service/login.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private _tokenService = inject(TokenService);
  private _loginService = inject(LoginService);
  private _router = inject(Router)

  loginApp: LoginModel = {email: '', password:''};
  formLogin!: FormGroup;

  constructor(){
    this.buildFormLogin();
  }

  buildFormLogin(){
    this.formLogin = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)])
    });
  }


  onLogin(event: Event){
    event.preventDefault();
    if(this.formLogin.valid){
      this.loginApp = this.formLogin.value;
      this._loginService.getAuth(this.loginApp).subscribe({
        next: () => {
          this._router.navigate(['/vaultForm'])
        },
        error: (error) => {
          alert(error.message)
        }
      });
    }
  }
}

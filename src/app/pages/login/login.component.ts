import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import {  map } from 'rxjs/operators';
import { of, catchError } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   *
   */
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService
  ) { }
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required]]
    })
  }

  get dadosForm() {
    return this, this.loginForm.controls;
  }

  loginUser() {
    this.loginService.login(this.dadosForm["email"].value, this.dadosForm["senha"].value).subscribe({
      next: (token) => {
        //alert(token);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Erro de login:', err); // Adicione isso para logar o erro no console
        alert('Ocorreu um erro: ' + (err.error?.message || err.message || 'Erro desconhecido'));
      }
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services';
import { StorageService } from '../../../core/services';
import { DirectivesModule } from '../../../core/directives/directives.module';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, DirectivesModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  formGroup!: FormGroup;

  fieldTextType!: boolean;
  mensaje: string = '';
  valido = true;
  loadin: boolean = false;

  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, public authService: AuthService,
    private storageService:StorageService) {
    this.createFormGroup();
  }

  ngOnInit(): void {

  }


  onValidarUsuario() {
    if (this.formGroup.valid) {
      this.loadin = true;
      let usuario = this.formGroup.getRawValue();
      this.authService.validarUsuario(usuario.UserName, usuario.PasswordHash).subscribe(result => {
          if (result.success) {
            this.storageService.guardarToken(result.code);
            
              this.storageService.guardarAuth(result);
              this.router.navigateByUrl('/home');
            
          } else {
            this.mensaje = result.message;
            this.valido = result.success;
          }
          
          this.loadin = false;
        });
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      UserName: new FormControl('', [Validators.required,Validators.email,Validators.maxLength(200)]),
      PasswordHash: new FormControl('', [Validators.required]),
    });
  }

}

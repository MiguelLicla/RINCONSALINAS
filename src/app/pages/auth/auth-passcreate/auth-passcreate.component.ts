import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services';
import { StorageService } from '../../../core/services';
import { DirectivesModule } from '../../../core/directives/directives.module';

@Component({
  selector: 'app-auth-passcreate',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, DirectivesModule],
  templateUrl: './auth-passcreate.component.html'
})
export class AuthPasscreateComponent {

  formGroup!: FormGroup;

  submitted = false;
  passwordField!: boolean;
  confirmField!: boolean;
  token:string = '';
  // error = '';
  // returnUrl!: string;
  loadin: boolean = false;
  mensaje: string = '';
  valido = true;

  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private aroute: ActivatedRoute, public authService: AuthService, private storageService: StorageService) {
    this.token = this.aroute.snapshot.queryParamMap.get('token')!;
    this.token = encodeURIComponent(this.token);
    this.token = encodeURIComponent(this.token);//ES NECESARIO DOBLE ENCODE
   

    this.createFormGroup();
    
  }


  ngOnInit(): void {
    this.validarToken();
    this.validarPassword();
  }

  validarPassword(){
    var myInput = document.getElementById("password-input") as HTMLInputElement;
    var letter = document.getElementById("pass-lower");
    var capital = document.getElementById("pass-upper");
    var number = document.getElementById("pass-number");
    var length = document.getElementById("pass-length");

    myInput.onfocus = function () {
      let input = document.getElementById("password-contain") as HTMLElement;
      input.style.display = "block"
    };

    myInput.onblur = function () {
      let input = document.getElementById("password-contain") as HTMLElement;
      input.style.display = "none"
    };

    myInput.onkeyup = function () {
      var lowerCaseLetters = /[a-z]/g;
      if (myInput.value.match(lowerCaseLetters)) {
        letter?.classList.remove("invalid");
        letter?.classList.add("valid");
      } else {
        letter?.classList.remove("valid");
        letter?.classList.add("invalid");
      }
      var upperCaseLetters = /[A-Z]/g;
      if (myInput.value.match(upperCaseLetters)) {
        capital?.classList.remove("invalid");
        capital?.classList.add("valid");
      } else {
        capital?.classList.remove("valid");
        capital?.classList.add("invalid");
      }

      var numbers = /[0-9]/g;
      if (myInput.value.match(numbers)) {
        number?.classList.remove("invalid");
        number?.classList.add("valid");
      } else {
        number?.classList.remove("valid");
        number?.classList.add("invalid");
      }

      if (myInput.value.length >= 8) {
        length?.classList.remove("invalid");
        length?.classList.add("valid");
      } else {
        length?.classList.remove("valid");
        length?.classList.add("invalid");
      }
    };
  }

  validarToken(){

    if(this.token!= null && this.token.length > 5){
      this.authService.ValidaToken(this.token).subscribe(result => {
        if (!result.success) {
          this.router.navigateByUrl('/auth/login');
        }
        if (result.success) {
          this.mensaje = result.message;      
          }
      });
    }else{
      this.router.navigateByUrl('/auth/login');
    }
   
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loadin = true;
      let data = this.formGroup.getRawValue();
      

      this.authService.RestableceContraseña(data.PasswordHash, this.token).subscribe(result => {
        if (result.success) {
          this.router.navigateByUrl('/auth/login');
        }
        this.mensaje = result.message;
        this.valido = result.success;
        this.loadin = false;
      });
    }

    

  }
  togglepasswordField() {
    this.passwordField = !this.passwordField;
  }
  toggleconfirmField() {
    this.confirmField = !this.confirmField;
  }
  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      PasswordHash: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
      CPasswordHash: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]),
    }, { validators: this.passwordMatchValidator() });
  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      const formGroup = control as FormGroup;
      const password = formGroup.get('PasswordHash')?.value;
      const confirmPassword = formGroup.get('CPasswordHash')?.value;
      if (password && confirmPassword && password !== confirmPassword) {
        return { mismatch: true };
      }
      return null;
    };
  }

}

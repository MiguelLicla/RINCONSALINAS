import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services';
import { StorageService } from '../../../core/services';
import { DirectivesModule } from '../../../core/directives/directives.module';

@Component({
  selector: 'app-auth-passreset',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule, DirectivesModule],
  templateUrl: './auth-passreset.component.html'
})
export class AuthPassresetComponent {

  formGroup!: FormGroup;
  loadin: boolean = false;
  mensaje: string = '';
  valido = true;
  year: number = new Date().getFullYear();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private route: ActivatedRoute, public authService: AuthService, 
    private storageService: StorageService) {
    this.createFormGroup();
   }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.loadin = true;
      let usuario = this.formGroup.getRawValue();
      this.authService.GeneraToken(usuario.UserName).subscribe(result => {
          if (result.success) {
            this.storageService.guardarToken(result.code);
            this.mensaje = result.message;
            this.valido = result.success;
            this.router.navigateByUrl('/auth/login');
          } else {
            this.mensaje = result.message;
            this.valido = result.success;
          }
          this.loadin = false;
        });
    }
  }
 
  createFormGroup() {
    this.formGroup = this.formBuilder.group({
      UserName: new FormControl('', [Validators.required,Validators.email,Validators.maxLength(200)])
    });
  }

}

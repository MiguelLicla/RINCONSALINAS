import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BsModalRef, BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../../core/services/notification.service';
import { UsuarioComponent } from '../usuario/usuario.component';
import { IUsuario } from '../../../models/usuario.interface';
import { IReturn } from '../../../models';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-usuario-lista',
  standalone: true,
  imports: [CommonModule, ModalModule],
  templateUrl: './usuario-lista.component.html'
})
export class UsuarioListaComponent {
  modalRef!: BsModalRef;
  listaUsuario!: IUsuario[];
  loadin = false;

  constructor( private modalService:BsModalService, private notification:NotificationService, 
    private usuarioService: UsuarioService) { 

  }


  ngOnInit(): void {
    this.onBuscar();
  }


  onBuscar() {
    this.loadin = true;
    this.usuarioService.get().subscribe(result =>{
      this.listaUsuario = result;
    })
  }

  onNuevo() {

    UsuarioComponent.prototype.IdUsuario=0;
    this.modalRef = this.modalService.show(UsuarioComponent, { ignoreBackdropClick: true, class: "modal-md" });
    this.modalRef.content.event.subscribe((result: IReturn) => {
      if (result.success) {
        this.onBuscar();
      }
    });
  } 


  onEditar(id: number){  
    UsuarioComponent.prototype.IdUsuario=id;
    this.modalRef = this.modalService.show(UsuarioComponent,{ ignoreBackdropClick:true});
    this.modalRef.content.event.subscribe((result: IReturn) =>{
      if(result.success){
        this.onBuscar();
      }
    })
  }

  onEliminar(id: number){
    this.notification.Confirm('Confirmar si se elimina el Rol').then(confirm => {
      if (confirm) {
          this.usuarioService.delete(id).subscribe(result => {
           if (result.success) {
             this.onBuscar();
           }
           this.notification.Return(result);
         });
      }
    });
  }

}

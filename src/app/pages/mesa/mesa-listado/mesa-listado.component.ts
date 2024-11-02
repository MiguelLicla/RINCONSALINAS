import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MesaPlatoComponent } from '../mesa-plato/mesa-plato.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { MesaService } from '../../../services/mesa.service';
import { IMesa } from '../../../models/mesa.interface';

interface Mesa {
  id: number;
  estado: string;
  cantidadPlatos: number;
  total: number;
}
@Component({
  selector: 'app-mesa-listado',
  standalone: true,
  imports: [CommonModule  ],
  templateUrl: './mesa-listado.component.html',
  styleUrl: './mesa-listado.component.scss'
})
export class MesaListadoComponent {
  mesas!: IMesa[];
  modalRef!: BsModalRef;
  constructor(private http: HttpClient, private router:Router, private modalService: BsModalService, private mesaService:MesaService) {}
  @ViewChild('content') modalContent!: TemplateRef<any>;

  ngOnInit(): void {
    this.cargarMesas();
  }
  openModal() {
    this.modalRef = this.modalService.show(MesaPlatoComponent, { ignoreBackdropClick: true, class: "modal-md" });
    // this.modalRef.content.event.subscribe((result: IReturn) => {
    //   if (result.Success) {
    //     this.onBuscar();
    //   }
    // });
  }
  
  
  cargarMesas(): void {
    this.mesaService.get().subscribe(result => {
      this.mesas = result;
    })
  }
}

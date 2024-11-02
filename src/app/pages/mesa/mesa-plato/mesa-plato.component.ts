import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

export interface Dish {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

@Component({
  selector: 'app-mesa-plato',
  standalone: true,
  imports: [CommonModule], // Asegúrate de importar CommonModule aquí
  templateUrl: './mesa-plato.component.html',
  styleUrls: ['./mesa-plato.component.scss'],
})
export class MesaPlatoComponent {
  @Input() dishesList: Dish[] = [];
  selectedDishes: Dish[] = [];

  constructor(private bsModalRef: BsModalRef) {
    
  }
      
  ngOnInit(): void {}

  selectDish(dish: Dish) {
    this.selectedDishes.push(dish);
  }

  closeModal() {
    this.bsModalRef.hide();   }

  confirmSelection() {
    console.log('Platos seleccionados:', this.selectedDishes);
    this.closeModal(); // Cierra el modal después de confirmar la selección
  }
}

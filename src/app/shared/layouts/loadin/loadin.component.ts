import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loadin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loadin.component.html'
})
export class LoadinComponent {

  @Input() public show: boolean = false;
  @Input() public modal: boolean = false; 
  @Input() public height: string = '100px';
  
}

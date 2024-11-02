import { Component, EventEmitter, Output } from '@angular/core';
import { StorageService } from '../../../core/services';
import { IAuth } from '../../../models';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html'
})
export class TopbarComponent {

  @Output() mobileMenuButtonClicked = new EventEmitter();
  auth!: IAuth; 

  constructor(private storageService: StorageService){
    this.auth = this.storageService.leerAuth();
  }
 

  toggleMobileMenu(event: any) {
    document.querySelector('.hamburger-icon')?.classList.toggle('open')
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }

  
  windowScroll() {
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
      (document.getElementById("back-to-top") as HTMLElement).style.display = "block";
      document.getElementById('page-topbar')?.classList.add('topbar-shadow');
    } else {
      (document.getElementById("back-to-top") as HTMLElement).style.display = "none";
      document.getElementById('page-topbar')?.classList.remove('topbar-shadow');
    }
  }

}

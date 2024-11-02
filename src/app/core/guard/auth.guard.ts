import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { NotificationService, StorageService } from '../services';
//import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private storageService: StorageService, private router: Router, private notification: NotificationService) {

  }
  canActivate(childRoute: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    if (this.storageService.leerToken().length > 0) {

      if (this.storageService.autenticarOpcion(state.url)) {
        return true;
      } else {
        this.notification.Info('No tiene permiso para acceder a esta opcion.');
        this.router.navigateByUrl('/auth/login');
        return false;
      }
    } else {
      this.router.navigateByUrl('/auth/login');
      return false;
    }
  }
}


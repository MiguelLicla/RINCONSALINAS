import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { NotificationService, StorageService } from '../services';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const storageService = inject(StorageService);
  const notification = inject(NotificationService);
  const router = inject(Router);


  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer ' +  storageService.leerToken()
    }
  });


  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Redirigir a la página de inicio de sesión en caso de error de autenticación
        router.navigateByUrl('/auth/login');
      } else if (error.status === 404) {
        // Mostrar una notificación de error en caso de recurso no encontrado
        notification.Error("El recurso no está disponible en el servidor.");
      } else if (error.status === 500) {
        // Mostrar una notificación de error en caso de error interno del servidor
        if (error.error && error.error.Codigo === 'Error500') {
          notification.Error(error.error.Descripcion);
        } else {
          notification.Error("Se encontró un problema en el servidor, comunicarse con el administrador.");
        }
      } else {
        // Mostrar una notificación de error genérico para otros errores
        notification.Error("Ocurrió un error inesperado.");
      }
      // Retornar un observable de error para que la cadena de operadores continúe con el error
      return throwError(() => error);
    })
  );
};

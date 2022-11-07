import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(err => {
        if (err) {
          switch (err.status) {
            case 400:
              if (err.error.errors) {
                const modelState = [];
                for (const key in err.error.errors)
                  if (err.error.errors[key])
                    modelState.push(err.error.errors[key])
                return modelState.flat();
              }
              else {
                break;
              }
              break;
            case 401:
              break;
              break;
            case 404:
              this.router.navigateByUrl('/not-found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: err.errors } };
              this.router.navigateByUrl('/server-error', navigationExtras)
              break;
            default:
              //this.toaster.error('Something went wrong');
              console.log(err);
              break;
          }
        }
        return throwError(err);
      }
      )
    );
  }
}

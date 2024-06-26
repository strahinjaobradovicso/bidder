import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getToken();
  req = req.clone({
    setHeaders: {
      Authorization: token ? `${environment.AUTH_HEADER_KEY}: ${token}` : ''
    }
  })
  return next(req);
};

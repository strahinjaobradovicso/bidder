import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(environment.TOKEN_STORAGE_KEY);
  req = req.clone({
    setHeaders: {
      Authorization: token ? `${environment.AUTH_HEADER_KEY}: ${token}` : ''
    }
  })
  return next(req);
};

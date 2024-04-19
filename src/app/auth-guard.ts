import { CanActivateFn } from '@angular/router';
import { getDecoded } from './util/token';

export const authGuard: CanActivateFn = (route, state) => {
  const token = getDecoded();
  return token != undefined;
};

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export function stateGuard(stateKey: string): CanActivateFn {
  return  (route, state) => {
    const router = inject(Router);
    const stateData = router.getCurrentNavigation()?.extras.state?.[stateKey];
    if(stateData != undefined){
      return true;
    }
    return false;
  }
};

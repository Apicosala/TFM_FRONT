import { CanActivateChildFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { IUser } from '../models/user.interface';

export const isAdminGuard: CanActivateChildFn = (childRoute, state) => {
  const token = localStorage.getItem('auth_token');
  const tokenDecode: IUser = jwtDecode(token!);

  return tokenDecode.id === 2 ? true : false;
};

// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const userJson = localStorage.getItem('user');

  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      const token = user.token;
      const decoded: { exp: number } = jwtDecode(token);

      if (decoded.exp * 1000 > Date.now()) {
        const authReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`),
        });
        return next(authReq);
      } else {
        // Optionally: redirect or clear storage
        localStorage.removeItem('user');
      }
    } catch {
      localStorage.removeItem('user');
    }
  }

  return next(req);
};

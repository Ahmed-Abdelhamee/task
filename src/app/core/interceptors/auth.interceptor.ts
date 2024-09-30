import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    setHeaders: {
      authorization: "Bearer token",
    },
  });
  // return next(request); // we comment it as the data for page required has no auth 
  return next(req);
};

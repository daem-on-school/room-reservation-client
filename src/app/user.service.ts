import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

interface User {
  username: string;
  role: string;
}

@Injectable()
export class UserService {

  private currentUser: User | null = null;

  constructor() {
    const user = localStorage.getItem('user');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
  }

  public get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }

  private saveUser() {
    localStorage.setItem('user', JSON.stringify(this.currentUser));
  }

  public get user(): User | null {
    return this.currentUser;
  }

  public get isAdmin(): boolean {
    return this.currentUser?.role === 'Admin';
  }

  public set user(user: User | null) {
    this.currentUser = user;
    this.saveUser();
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap({
        next: (event) => {},
        error: (error) => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              this.userService.user = null;
              this.router.navigate(['/login']);
            }
          }
        }
      })
    );
  }
  
}
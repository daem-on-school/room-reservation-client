import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/api';
import { UserService } from '../user.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	form = new FormGroup({
		username: new FormControl('', [Validators.required]),
		password: new FormControl('', [Validators.required]),
	});

	constructor(
		private authService: AuthService,
		private router: Router,
		private userService: UserService,
	) { }

	ngOnInit(): void {
	}

	async login() {
		const username = this.form.value.username ?? '';
		const password = this.form.value.password ?? '';
		try {
			const result = await firstValueFrom(
				this.authService.authLoginPost({username, password}, "response")
			);

			if (result.ok) this.onSuccess(result, username);
		} catch (error) {
			if (error instanceof HttpErrorResponse) {
				if (error.status === 401) {
					alert("Invalid username or password");
				} else alert(error.message);
			} else console.error(error);
		}
	}

	onSuccess(resp: HttpResponse<string[]>, username: string) {
		this.userService.user = {
			role: resp.body![0],
			username,
		};

		this.router.navigate(['/']);
	}

}

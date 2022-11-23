import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/api';

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

	constructor(private authService: AuthService) { }

	ngOnInit(): void {
	}

	async login() {
		try {
			const result = await firstValueFrom(
				this.authService.authLoginPost({
					username: this.form.value.username ?? '',
					password: this.form.value.password ?? ''
				}, "response")
			);

			if (result.status === 200) {
				console.log("Login successful");
			}
		} catch (error) {
			if (error instanceof HttpErrorResponse) {
				if (error.status === 401) {
					alert("Invalid username or password");
				} else alert(error.message);
			} else console.error(error);
		}
	}

}

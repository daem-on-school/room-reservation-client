import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from 'src/api';
import { UserService } from './user.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	get isLoggedIn() { return this.userService.isLoggedIn; }
	get userText(): string | undefined { 
		const user = this.userService.user;
		if (!user) return undefined;
		return `Logged in as ${user?.username} (${user?.role})`;
	}

	constructor(readonly userService: UserService, private authService: AuthService) {}

	async logout() {
		const resp = await firstValueFrom(this.authService.authLogoutPost('response'));

		if (resp.ok) {
			this.userService.user = null;
			window.location.reload();
		}
	}
}

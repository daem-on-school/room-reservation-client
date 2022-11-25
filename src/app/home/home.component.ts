import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { EventService, EventSummaryDTO } from '../../api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private eventService: EventService, private router: Router) {}

	events: EventSummaryDTO[] = [];

	async ngOnInit() {
		this.events = await firstValueFrom(this.eventService.getAll());
	}
}

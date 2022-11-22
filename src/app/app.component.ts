import { Component, OnInit } from '@angular/core';
import { EventService, EventSummaryDTO } from '../api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private eventService: EventService) {}

	title = 'room-reservation';
	events: EventSummaryDTO[] = [];

	ngOnInit() {
		this.eventService.getAll().subscribe(e => this.events = e);
	}
}

import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { EventService, EventSummaryDTO } from '../../api';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private eventService: EventService) {}

	title = 'room-reservation';
	today = new Date();
	events: CalendarEvent[] = [];

	async ngOnInit() {
		const response = await firstValueFrom(this.eventService.getAll());
		
		this.events = response.map(this.convert);
	}

	private convert(event: EventSummaryDTO): CalendarEvent {
		return {
			title: event.title!,
			start: new Date(event.start!),
			end: new Date(event.end!),
		};
	}
}
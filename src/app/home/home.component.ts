import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalendarEvent } from 'angular-calendar';
import { firstValueFrom } from 'rxjs';
import { EventService, EventSummaryDTO } from '../../api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	constructor(private eventService: EventService, private router: Router) {}

	title = 'room-reservation';
	today = new Date();
	events: CalendarEvent[] = [];

	async ngOnInit() {
		const response = await firstValueFrom(this.eventService.getAll());
		
		this.events = response.map(this.convert);
	}

	private convert(event: EventSummaryDTO): CalendarEvent {
		return {
			id: event.id!,
			title: event.title!,
			start: new Date(event.start!),
			end: new Date(event.end!),
		};
	}

	onEventClicked($ev: {
        event: CalendarEvent;
        sourceEvent: MouseEvent | KeyboardEvent;
    }) {
		this.router.navigate([`/event/${$ev.event.id}`]);
	}
}

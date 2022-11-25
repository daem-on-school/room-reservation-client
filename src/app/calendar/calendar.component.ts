import { Component, Input } from '@angular/core';
import { EventSummaryDTO } from 'src/api';
import { CalendarEvent } from 'angular-calendar';
import { Router } from '@angular/router';

export function convertToCalendar(event: EventSummaryDTO): CalendarEvent {
	return {
		id: event.id!,
		title: event.title!,
		start: new Date(event.start!),
		end: new Date(event.end!),
	};
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent {

  constructor(private router: Router) { }

	today = new Date();
  @Input() events: EventSummaryDTO[] = [];
  
  get calendarEvents(): CalendarEvent[] {
    return this.events.map(convertToCalendar);
  }

	onEventClicked($ev: {
    event: CalendarEvent;
    sourceEvent: MouseEvent | KeyboardEvent;
  }) {
    this.router.navigate([`/event/${$ev.event.id}`]);
  }
}

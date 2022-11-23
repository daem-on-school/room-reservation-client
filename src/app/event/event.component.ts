import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService, EventWithReservationDTO } from 'src/api';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  event?: EventWithReservationDTO;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const idNumber = parseInt(id);
      if (isNaN(idNumber)) return;
      this.eventService.eventIdGet(idNumber)
        .subscribe(event => {
          this.event = event;
        });
    }
  }

}

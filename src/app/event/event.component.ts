import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
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

  async delete(): Promise<void> {
    if (this.event) {
      const resp = await firstValueFrom(
        this.eventService.eventIdDelete(this.event.id!, "response")
      );

      if (resp.status === 204) {
        window.location.href = "/home";
      }
    }
  }

}

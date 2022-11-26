import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { EventService } from 'src/api';

@Component({
  selector: 'app-specific-reservation',
  templateUrl: './specific-reservation.component.html',
  styleUrls: ['./specific-reservation.component.scss']
})
export class SpecificReservationComponent implements OnInit {

  eventId?: number;
  roomName = new FormControl('', [Validators.required]);
  errors: string[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private eventService: EventService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('eventId');
    if (id && !isNaN(parseInt(id))) {
      this.eventId = parseInt(id);
    }
  }

  async tryCreateReservation() {
    if (this.eventId) {
      try {
        await firstValueFrom(this.eventService.eventIdReservationsPost(
          this.eventId,
          (this.roomName.value!).split(',')
        ));
        this.router.navigate([`/event`, this.eventId]);
      } catch (error) {
        if (error instanceof HttpErrorResponse) {
          this.errors = Object.values(error.error).flat() as string[];
        }
      }
    }
  }

}

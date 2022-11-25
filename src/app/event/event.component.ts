import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { EventService, EventWithReservationDTO, RoomDTO } from 'src/api';
import { UserService } from '../user.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  event?: EventWithReservationDTO;
  isOrganizer: boolean = false;
  reservationLink?: string;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private userService: UserService,
  ) { }

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.load(parseInt(id));
  }

  async load(id: number) {
    if (isNaN(id)) return;
    const event = await firstValueFrom(this.eventService.eventIdGet(id));
    
    this.event = event;
    this.isOrganizer = 
      this.userService.user?.role === "Admin"
      || event.organizerName === this.userService.user?.username;
    this.reservationLink = `/create/reservation/${event.id}`;
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

  formatDate(date?: string) {
    if (!date) return "";
    return new Date(date).toLocaleString();
  }

  async cancelReservation(reservation: RoomDTO): Promise<void> {
    if (this.event) {
      const resp = await firstValueFrom(
        this.eventService.eventIdReservationsDelete(
          this.event.id!, [reservation.name!],
          "response"
        )
      );

      if (resp.status === 204) {
        this.load(this.event.id!);
      }
    }
  }

}

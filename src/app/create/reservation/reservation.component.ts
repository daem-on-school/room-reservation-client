import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, Subscription } from 'rxjs';
import { EventService, RoomDTO } from 'src/api';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent implements OnInit, OnDestroy {
  id?: number;
  private _allReservableRooms?: RoomDTO[];
  reservableRooms?: RoomDTO[];
  search = new FormControl('');

  get foundRooms() { return (this._allReservableRooms?.length ?? 0) > 0; }

  toReserve: Record<string, boolean> = {};

  sub?: Subscription;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  async ngOnInit(): Promise<void> {
    this.id = parseInt(this.route.snapshot.paramMap.get('eventId')!);
    if (isNaN(this.id)) return;

    this.sub = this.search.valueChanges.subscribe(
      query => this.onSearch(query ?? '')
    );

    this.loadReservable();
  }

  async loadReservable() {

    try {
      const resp = await firstValueFrom(
        this.eventService.eventFindRoomIdGet(this.id!, "response")
      );
      this._allReservableRooms = resp.body!;
      this.reservableRooms = this._allReservableRooms;
      this.toReserve = {};

      for (const room of this.reservableRooms) {
        this.toReserve[room.name!] = false;
      }

    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 404) this.reservableRooms = [];
        else alert(error.message);
      }
    }
  }

  onSearch(query: string) {
    if (!this._allReservableRooms) return;
    if (query.length === 0) this.reservableRooms = this._allReservableRooms;
    query = query.toLowerCase();
    this.reservableRooms = this.
      _allReservableRooms!
      .filter(room => room.name!.toLowerCase().includes(query));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  async reserve() {
    const rooms = Object.entries(this.toReserve)
      .filter(([_, reserve]) => reserve)
      .map(([name, _]) => name );

    if (rooms.length === 0) return;
    
    try {
      const resp = await firstValueFrom(
        this.eventService.eventIdReservationsPost(this.id!, rooms, "response")
      );

      if (resp.status === 200) {
        alert('Reservation successful!');
        this.router.navigate(['/event', this.id]);
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        alert(error.message);
      }
    }
  }

  onReserveChanged(room: RoomDTO, event: Event) {
    this.toReserve[room.name!] = (event.target! as HTMLInputElement).checked;
  }

}

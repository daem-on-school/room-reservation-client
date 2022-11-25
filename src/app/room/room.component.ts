import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { EventSummaryDTO, RoomService } from 'src/api';
import { formatDate } from '../event/event.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  name?: string;
  events: EventSummaryDTO[] = [];

  constructor(
    private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    readonly userService: UserService,
  ) { }

  formatDate = formatDate;

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (!name) return;
    this.load(name);
  }

  async load(name: string) {
    this.events = await firstValueFrom(this.roomService.roomNameEventsGet(name));
    this.name = name;
  }

  async delete() {
    if (!this.name) return;
    if (!confirm("Are you sure you want to delete this room?")) return;
    await firstValueFrom(this.roomService.roomNameDelete(this.name));
    this.router.navigate(["/rooms"]);
  }

}

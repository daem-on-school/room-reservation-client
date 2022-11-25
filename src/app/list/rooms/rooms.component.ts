import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { RoomDTO, RoomService } from 'src/api';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class ListRoomsComponent implements OnInit {

  rooms: RoomDTO[] = [];

  constructor(readonly roomService: RoomService, readonly userService: UserService) { }

  ngOnInit(): void {
    this.load();
  }

  async load() {
    this.rooms = await firstValueFrom(this.roomService.getAllRooms());
  }

  async deleteRoom(name: string) {
    if (!confirm("Are you sure you want to delete this room?")) return;
    await firstValueFrom(this.roomService.roomNameDelete(name));
    this.load();
  }

}

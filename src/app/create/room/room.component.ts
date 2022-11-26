import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { RoomDTO, RoomService } from 'src/api';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class CreateRoomComponent implements OnInit {

  keywords = new FormArray<FormControl<string | null>>([]);
  name = new FormControl('', Validators.required);
  copying: string | null = null;

  constructor(
    readonly roomService: RoomService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const name = this.route.snapshot.paramMap.get('name');
    if (name) this.copying = name;
  }

  addKeyword() {
    this.keywords.push(new FormControl('', Validators.required));
  }

  async createRoom() {
    const isCopying = this.copying !== null;
    try {
      const keywords = this.keywords.value.filter(x => x !== null) as string[];

      const roomData: RoomDTO = {
        name: this.name.value!,
        keywords,
      };
      const resp = isCopying
      ? await firstValueFrom(this.roomService.roomCopyFromPost(this.copying!, roomData, 'response'))
      : await firstValueFrom(this.roomService.roomPost(roomData, 'response'));
  
      if (resp.ok) {
        this.router.navigate(['/room', this.name.value!]);
      }
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        alert(e.message);
      }
    }
  }

}

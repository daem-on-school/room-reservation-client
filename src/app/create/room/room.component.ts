import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RoomService } from 'src/api';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  keywords = new FormArray<FormControl<string | null>>([]);
  name = new FormControl('', Validators.required);

  constructor(readonly roomService: RoomService, private router: Router) { }

  ngOnInit(): void {
  }

  addKeyword() {
    this.keywords.push(new FormControl('', Validators.required));
  }

  async createRoom() {
    try {
      const keywords = this.keywords.value.filter(x => x !== null) as string[];
      const resp = await lastValueFrom(this.roomService.roomPost({
        name: this.name.value!,
        keywords,
      }, 'response'));
  
      if (resp.ok) {
        this.router.navigate(['/']);
      }
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        alert(e.message);
      }
    }
  }

}

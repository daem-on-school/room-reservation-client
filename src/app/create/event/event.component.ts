import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from 'src/api';

@Component({
  selector: 'app-create-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class CreateEventComponent implements OnInit {
  roomList = [];

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
    startTime: new FormControl('', Validators.required),
    endTime: new FormControl('', Validators.required),
  });

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  createEvent() {
    console.log(this.form.value);
  }
}

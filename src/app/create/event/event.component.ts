import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventCreationDTO, EventService } from 'src/api';
import { parse, format, formatISO, isBefore } from 'date-fns';
import { firstValueFrom } from 'rxjs';

const timeFormat = 'HH:mm:ss';
const dateFormat = 'yyyy-MM-dd';
const now = new Date();

const timeValidator = Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);

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
    start: new FormControl(format(now, dateFormat), Validators.required),
    end: new FormControl(format(now, dateFormat), Validators.required),
    startTime: new FormControl(format(now, timeFormat), [Validators.required, timeValidator]),
    endTime: new FormControl(format(now, timeFormat), [Validators.required, timeValidator]),
    public: new FormControl(true),
  });

  constructor(private eventService: EventService) { }

  ngOnInit(): void {
  }

  convert(): EventCreationDTO {
    const source = this.form.value;
    const start = parse(
      source.startTime!, timeFormat,
      parse(source.start!, dateFormat, new Date())
    );
    const end = parse(
      source.endTime!, timeFormat,
      parse(source.end!, dateFormat, new Date())
    );
    if (isBefore(end, start)) {
      throw new Error("End date must be after start date");
    }
    return {
      title: source.title!,
      description: source.description!,
      start: formatISO(start),
      end: formatISO(end),
    }
  }

  async createEvent() {
    const resp = await firstValueFrom(
      this.eventService.eventPost(this.convert(), "response")
    );

    if (resp.status === 201) {
      window.location.href = resp.headers.get('location')!;
    }
  }
}

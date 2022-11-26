import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventCreationDTO, EventService } from 'src/api';
import { parse, format, formatISO, isBefore } from 'date-fns';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

export const timeFormat = 'HH:mm:ss';
export const dateFormat = 'yyyy-MM-dd';
const now = new Date();

export const timeValidator = Validators.pattern(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/);

export type EventFormValue = Partial<{
  title: string | null;
  description: string | null;
  start: string | null;
  end: string | null;
  startTime: string | null;
  endTime: string | null;
  public: boolean | null;
}>;

export function convertEventForm(source: EventFormValue): EventCreationDTO {
    const start = parse(
      source.startTime!, timeFormat,
      parse(source.start!, dateFormat, new Date())
    );
    const end = parse(
      source.endTime!, timeFormat,
      parse(source.end!, dateFormat, new Date())
    );
    if (isBefore(end, start)) {
      alert("End date must be after start date");
    }
    return {
      title: source.title!,
      description: source.description!,
      start: formatISO(start),
      end: formatISO(end),
      isPublic: source.public!,
    }
  }

@Component({
  selector: 'app-create-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class CreateEventComponent implements OnInit {
  roomList = [];
  editing: number | null = null;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    start: new FormControl(format(now, dateFormat), Validators.required),
    end: new FormControl(format(now, dateFormat), Validators.required),
    startTime: new FormControl(format(now, timeFormat), [Validators.required, timeValidator]),
    endTime: new FormControl(format(now, timeFormat), [Validators.required, timeValidator]),
    public: new FormControl(true),
  });

  constructor(
    private eventService: EventService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editing = parseInt(id);
      this.load(this.editing);
    }
  }

  async load(id: number) {
    if (isNaN(id)) return;
    const event = await firstValueFrom(this.eventService.eventIdGet(id));
    const start = new Date(event.start!);
    const end = new Date(event.end!);
    this.form.patchValue({
      title: event.title,
      description: event.description,
      start: format(start, dateFormat),
      end: format(end, dateFormat),
      startTime: format(start, timeFormat),
      endTime: format(end, timeFormat),
      public: event.isPublic,
    });
  }

  async createEvent() {
    const resp = await firstValueFrom(
      this.eventService.eventPost(
        convertEventForm(this.form.value),
        "response")
    );

    if (resp.status === 201) {
      this.router.navigate([`/event/`, resp.body.id]);
    }
  }

  async updateEvent() {
    if (this.editing === null) return;

    try {
      await firstValueFrom(
        this.eventService.eventIdPut(
          this.editing,
          convertEventForm(this.form.value),
          "response")
      );
      
      this.router.navigate([`/event`, this.editing]);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        if (e.status === 400) {
          alert(Object.values(e.error).flat().join("; "));
        }
      }
    }
  }
}

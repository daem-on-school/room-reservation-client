import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEventComponent } from './create/event/event.component';
import { ReservationComponent } from './create/reservation/reservation.component';
import { CreateRoomComponent } from './create/room/room.component';
import { EventComponent } from './event/event.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ListRoomsComponent } from './list/rooms/rooms.component';
import { RoomComponent } from './room/room.component';
import { SpecificReservationComponent } from './create/specific-reservation/specific-reservation.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'create/event',
    component: CreateEventComponent,
  },
  {
    path: 'event/:id',
    component: EventComponent,
  },
  {
    path: 'create/reservation/:eventId',
    component: ReservationComponent
  },
  {
    path: 'create/room',
    component: CreateRoomComponent
  },
  {
    path: 'rooms',
    component: ListRoomsComponent
  },
  {
    path: 'room/:name',
    component: RoomComponent
  },
  {
    path: 'event/:id/edit',
    component: CreateEventComponent
  },
  {
    path: 'room/:name/copy',
    component: CreateRoomComponent
  },
  {
    path: 'create/specific-reservation/:eventId',
    component: SpecificReservationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export * from './auth.service';
import { AuthService } from './auth.service';
export * from './event.service';
import { EventService } from './event.service';
export * from './room.service';
import { RoomService } from './room.service';
export const APIS = [AuthService, EventService, RoomService];

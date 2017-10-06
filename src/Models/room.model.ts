import { BaseModel } from './base.model';

export class RoomModel extends BaseModel {
     owner : string;
     roomName: string;
     categoryName: string;
     entryCode: string;
     
}
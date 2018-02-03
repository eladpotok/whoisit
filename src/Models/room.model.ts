import { BaseModel } from './base.model';
import { UserModel } from './user.model';

export class RoomModel extends BaseModel {
     owner : string;
     roomName: string;
     categoryName: string;
     entryCode: string;
     isCategorySelected: Boolean;
     users: UserModel[];
     spy: string;
     settingsKey: string;
     usernames?: string[];
}
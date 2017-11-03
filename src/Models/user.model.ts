import { BaseModel } from './base.model';
import { Observable } from 'rxjs/Observable';

export class UserModel extends BaseModel {
    displayName: string
    imageUrl: string
    totalPoints: number
    games: number
    level: string
    isAuthenticated: Boolean
    pointsInRoom?: number
    isOwner: boolean;
}
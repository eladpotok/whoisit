import { BaseModel } from './base.model';

export class UserModel extends BaseModel {
    displayName: string
    imageUrl: string
    totalPoints: number
    games: number
    level: string
    isAuthenticated: Boolean
}
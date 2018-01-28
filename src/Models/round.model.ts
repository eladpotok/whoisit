import { BaseModel } from './base.model';

export class RoundModel extends BaseModel {
     roomKey: string
     spyKey: string
     selectorKey: string
     categoryKey: string
     secret: number
     votesCount: number
}
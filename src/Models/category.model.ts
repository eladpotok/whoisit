import { BaseModel } from './base.model';

export class CategoryModel extends BaseModel {
     title: string
     description: string
     url: string;
     members: MemberModel[];
}

export class MemberModel extends BaseModel {
    url: string
    title: string
}
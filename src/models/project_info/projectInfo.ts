import { type ILocation } from '@/models/project_info/location.ts'

export interface IProjectInfo {
  id?: string;
  name: string;
  location: ILocation;
  deleted: boolean;
}

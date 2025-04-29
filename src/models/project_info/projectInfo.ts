import { type Location } from '@/models/project_info/location.ts'

export interface ProjectInfo {
  id?: string;
  name: string;
  location: Location;
}

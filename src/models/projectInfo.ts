import { type Location } from '@/models/location.ts'

export interface ProjectInfo {
  id?: string;
  name: string;
  location: Location;
}

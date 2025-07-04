/**
 * projectInfo.ts
 *
 * This file defines the IProjectInfo interface, which is used to represent
 * the essential information about a project within the application.
 */

import { type ILocation } from '@/models/project_info/location.ts'

export interface IProjectInfo {
  id?: string;
  name: string;
  location: ILocation;
  deleted: boolean;
}

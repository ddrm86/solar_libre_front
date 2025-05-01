import { type IComponent, validateComponent } from '@/models/inventory/component.ts'

export interface IPanel extends IComponent {
  nominal_power: number;
  vmpp: number;
  impp: number;
  voc: number;
  isc: number;
  length: number;
  width: number;
}

export const validatePanel = (panel: IPanel): boolean => {
  if (!validateComponent(panel)) {
    return false;
  }
  if (!panel.nominal_power) {
    return false;
  }
  if (!panel.vmpp) {
    return false;
  }
  if (!panel.impp) {
    return false;
  }
  if (!panel.voc) {
    return false;
  }
  if (!panel.isc) {
    return false;
  }
  if (!panel.length) {
    return false;
  }
  if (!panel.width) {
    return false;
  }
  return true;
};

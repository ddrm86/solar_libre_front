/**
 * panel.ts
 *
 * This file defines the IPanel interface, which extends IComponent to represent a solar panel
 * with electrical and physical properties such as nominal power, voltage and current at maximum power point,
 * open circuit voltage, short circuit current, length, and width.
 * The validatePanel function checks that all required fields of a panel are present and valid,
 * using the validateComponent function for base component validation and additional checks
 * for each panel-specific property.
 */

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

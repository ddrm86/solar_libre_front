/**
 * monophaseInverter.ts
 *
 * This file defines the IMonophaseInverter interface, which extends IComponent to represent
 * a monophase inverter with specific electrical properties such as recommended maximum input power,
 * nominal output power, input and output voltages, MPPT characteristics, and current ratings.
 * The validateMonophaseInverter function checks that all required fields of a monophase inverter
 * are present and valid, using the validateComponent function for base component validation
 * and additional checks for each inverter-specific property.
 */

import { type IComponent, validateComponent } from '@/models/inventory/component.ts'

export interface IMonophaseInverter extends IComponent {
  recommended_max_input_power: number;
  nominal_output_power: number;
  max_input_voltage: number;
  startup_voltage: number;
  min_mppt_operating_voltage: number;
  max_mppt_operating_voltage: number;
  max_input_current_per_mppt: number;
  max_short_circuit_current_per_mppt: number;
  number_of_mppts: number;
  max_inputs_per_mppt: number;
  max_output_current: number;
}

export const validateMonophaseInverter = (inverter: IMonophaseInverter): boolean => {
  if (!validateComponent(inverter)) {
    return false;
  }
  if (!inverter.recommended_max_input_power) {
    return false;
  }
  if (!inverter.nominal_output_power) {
    return false;
  }
  if (!inverter.max_input_voltage) {
    return false;
  }
  if (!inverter.startup_voltage) {
    return false;
  }
  if (!inverter.min_mppt_operating_voltage) {
    return false;
  }
  if (!inverter.max_mppt_operating_voltage) {
    return false;
  }
  if (!inverter.max_input_current_per_mppt) {
    return false;
  }
  if (!inverter.max_short_circuit_current_per_mppt) {
    return false;
  }
  if (!inverter.number_of_mppts) {
    return false;
  }
  if (!inverter.max_inputs_per_mppt) {
    return false;
  }
  if (!inverter.max_output_current) {
    return false;
  }
  return true;
};

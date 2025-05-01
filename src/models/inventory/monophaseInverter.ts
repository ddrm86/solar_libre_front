import { type IComponent, validateComponent } from '@/models/inventory/component.ts'

export interface IMonophaseInverter extends IComponent {
  recommendedMaxInputPower: number;
  nominalOutputPower: number;
  maxInputVoltage: number;
  startupVoltage: number;
  minMpptOperatingVoltage: number;
  maxMpptOperatingVoltage: number;
  maxInputCurrentPerMppt: number;
  maxShortCircuitCurrent: number;
  numberOfMppts: number;
  maxInputsPerMppt: number;
  maxOutputCurrent: number;
}

export const validateMonophaseInverter = (inverter: IMonophaseInverter): boolean => {
  if (!validateComponent(inverter)) {
    return false;
  }
  if (!inverter.recommendedMaxInputPower) {
    return false;
  }
  if (!inverter.nominalOutputPower) {
    return false;
  }
  if (!inverter.maxInputVoltage) {
    return false;
  }
  if (!inverter.startupVoltage) {
    return false;
  }
  if (!inverter.minMpptOperatingVoltage) {
    return false;
  }
  if (!inverter.maxMpptOperatingVoltage) {
    return false;
  }
  if (!inverter.maxInputCurrentPerMppt) {
    return false;
  }
  if (!inverter.maxShortCircuitCurrent) {
    return false;
  }
  if (!inverter.numberOfMppts) {
    return false;
  }
  if (!inverter.maxInputsPerMppt) {
    return false;
  }
  if (!inverter.maxOutputCurrent) {
    return false;
  }
  return true;
};

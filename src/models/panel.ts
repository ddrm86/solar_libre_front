export interface Panel {
  id?: string;
  maker: string;
  model: string;
  nominal_power: number;
  vmpp: number;
  impp: number;
  voc: number;
  isc: number;
  length: number;
  width: number;
  reference?: string;
  description?: string;
  deleted: boolean;
}

export const validatePanel = (panel: Panel): boolean => {
  if (!panel.maker?.trim()) {
    return false;
  }
  if (!panel.model?.trim()) {
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

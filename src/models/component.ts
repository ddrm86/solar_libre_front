export interface Component {
  id?: string;
  maker: string;
  model: string;
  reference?: string;
  description?: string;
  deleted: boolean;
}

export const validateComponent = (component: Component): boolean => {
  if (!component.maker?.trim()) {
    return false;
  }
  if (!component.model?.trim()) {
    return false;
  }
  return true;
}

/**
 * component.ts
 *
 * This file defines the IComponent interface and a validation function for component objects.
 * The IComponent interface represents an inventory component with optional id, reference,
 * and description fields, as well as required maker, model, and deleted status.
 * The validateComponent function checks that the maker and model fields are non-empty strings,
 * returning true if the component is valid and false otherwise.
 */

export interface IComponent {
  id?: string;
  maker: string;
  model: string;
  reference?: string;
  description?: string;
  deleted: boolean;
}

export const validateComponent = (component: IComponent): boolean => {
  if (!component.maker?.trim()) {
    return false;
  }
  if (!component.model?.trim()) {
    return false;
  }
  return true;
}

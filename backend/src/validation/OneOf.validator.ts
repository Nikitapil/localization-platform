import {
  ValidationOptions,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  Validate
} from 'class-validator';

@ValidatorConstraint({ name: 'IsOneOfProvided', async: false })
export class IsOneOfProvidedConstraint implements ValidatorConstraintInterface {
  validate(object: object, args: ValidationArguments) {
    const fields = args.constraints[0] as string[];

    return (
      fields.filter((field: keyof typeof object) => {
        const fieldValue = object[field];
        return (
          fieldValue !== undefined &&
          fieldValue !== null &&
          fieldValue !== '' &&
          !(typeof fieldValue === 'object' && fieldValue && Object.keys(fieldValue as object).length === 0)
        );
      }).length === 1
    );
  }

  defaultMessage(args: ValidationArguments) {
    const fields = args.constraints[0] as string[];
    return `Only one of the following fields must be provided: ${fields.join(', ')}`;
  }
}

// Декоратор для применения к классу
export function IsOneOfProvided<T extends { prototype: object }>(
  fields: string[],
  validationOptions?: ValidationOptions
) {
  return function (target: T) {
    Validate(IsOneOfProvidedConstraint, [fields], {
      ...validationOptions,
      // Указываем, что это валидация класса
      each: false
    })(target.prototype, '');
  };
}

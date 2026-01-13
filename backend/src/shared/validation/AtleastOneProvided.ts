import { ValidationOptions, ValidationArguments, registerDecorator } from 'class-validator';

export function AtleastOneProvided<T extends object>(fields: string[], validationOptions?: ValidationOptions) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      name: 'AtleastOneProvided',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [fields],
      options: validationOptions,
      validator: {
        validate: function (value: any, args: ValidationArguments) {
          const [fields] = args.constraints;
          return (
            fields.filter((field: keyof typeof args.object) => {
              const fieldValue = args.object?.[field];
              return (
                fieldValue !== undefined &&
                fieldValue !== null &&
                fieldValue !== '' &&
                !(typeof fieldValue === 'object' && fieldValue && Object.keys(fieldValue as object).length === 0)
              );
            }).length > 0
          );
        }
      }
    });
  };
}

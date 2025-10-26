import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsMatch<T extends object>(property: keyof T, validationOptions?: ValidationOptions) {
  return function (object: T, propertyName: string) {
    registerDecorator({
      name: 'isMatch',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate: function (value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints as [keyof T];
          const relatedValue = (args.object as T)[relatedPropertyName];
          return relatedValue === value;
        }
      }
    });
  };
}
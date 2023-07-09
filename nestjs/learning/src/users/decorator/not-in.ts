import { registerDecorator, ValidationOptions, ValidationArguments, ValidatorConstraintInterface } from "class-validator";

const validator: ValidatorConstraintInterface = {
    validate(value: any, args: ValidationArguments) {
        const { constraints: [ relatedPropertyName ] } = args;
        const relatedValue = (args.object as any)[relatedPropertyName];
        console.log("value", value, typeof value);
        console.log("relatedValue", relatedValue, typeof relatedValue);
        return typeof value === "string" && typeof relatedValue === "string" && !relatedValue.includes(value)
    }
};

const NotIn = (property: string, validationOptions?: ValidationOptions) => {
    return (obj: object, propertyName: string) => {
        registerDecorator({
            name: "NotIn",
            target: obj.constructor,
            propertyName,
            options: validationOptions,
            constraints: [property],
            validator
        });
    };
};

export {
    NotIn
};
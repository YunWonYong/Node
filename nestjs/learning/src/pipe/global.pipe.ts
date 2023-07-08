import { Injectable, PipeTransform, ArgumentMetadata, BadRequestException, Type } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const obj = plainToClass(metatype, value);
        const errors = await validate(obj);
        if (errors.length > 0) {
            throw new BadRequestException("Validation failed");
        }

        return value;
    }

    private toValidate(metatype: Type<any>): boolean {
        const types: Type<any>[] = [String, Number, Boolean, Array, Object];
        return !types.includes(metatype);
    }
}
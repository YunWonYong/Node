import { applyDecorators } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptions } from "@nestjs/swagger";
import { IsNumber, IsString, IsNumberString, IsNotEmpty, IsDateString, IsDate, } from "class-validator";

enum Type {
    NUMBER = "number",
    STRING = "string",
    NUMBER_STRING = "n_s",
    DATE = "date",
    DATE_STRING = "d_s"
}

const getTypeDecorator = (type: Type) => {
    switch(type) {
        case Type.NUMBER:
            return IsNumber();
        case Type.STRING:
            return IsString();
        case Type.NUMBER_STRING:
            return IsNumberString();
        case Type.DATE:
            return IsDate();
        case Type.DATE_STRING:
            return IsDateString();
        default:
            throw new Error(`not supported type ${type}`);
    }
}

type DTOParam = {
    example?: any
    type: Type,
    typeDeco?: PropertyDecorator
    required?: boolean,
    desc: string
};

const TypeSwgDeco = (dto: DTOParam) => {
    const { example, type, typeDeco, required, desc } = dto;
    const typeDecorator = typeDeco !== undefined? typeDeco: getTypeDecorator(type);
    const apiOption: ApiPropertyOptions = {
        description: desc,
    };

    if (example) {
        apiOption.example = example;
    }
    const decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[] = [
        ApiProperty(apiOption),
        typeDecorator
    ];

    if (required !== undefined && required) {
        decorators.push(IsNotEmpty);
    }

    return applyDecorators(...decorators);
};

export {
    TypeSwgDeco,
    Type
}

import { Controller, applyDecorators } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

const ControllerSwg = (tag: string) => {
    return applyDecorators(
        Controller(tag),
        ApiTags(tag),
    );
};

export {
    ControllerSwg
};
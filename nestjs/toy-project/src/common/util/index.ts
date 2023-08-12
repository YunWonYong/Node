import { DTOInteface, EntityGetterInterface, EntityInterface, EntitySetterInterface } from "../interface";

function dtoToEntity<F extends DTOInteface, T extends EntityInterface>(from: F, to: T) {
    Object.keys(from).forEach((key: string) => {
        // [TODO] 다른 방법 찾아보기
        eval(`to["${key}"] = from["${key}"];`);
    });
    return to;
}

function dtoToSetterEntity<F extends DTOInteface, T extends EntitySetterInterface>(from: F, to: T) {
    Object.keys(from).forEach((key: string) => {
        // [TODO] 다른 방법 찾아보기
        to.set(key, eval("from[key]"));
    });
    return to;
}

function entityToDTO<F extends EntityInterface, T extends DTOInteface>(from: F, to: T): T {
    Object.keys(to).forEach((key: string) => {
        // [TODO] 다른 방법 찾아보기
        eval(`to["${key}"] = from["${key}"];`);
    });
    return to;
}

function entityListToDTOList<F extends EntityInterface[], T extends DTOInteface>(from: F, to: T): T[] {
    return from.map((entity: EntityInterface) => ({...entityToDTO(entity, to)}));
}

function getterEntityListToDTOList<F extends EntityGetterInterface[], T extends DTOInteface>(from: F, to: { new(): T }): T[] {
    return from.map((entity: EntityGetterInterface) => entity.get<T>(new to()));
}

const getCurrentDate = (): string => {
    const date = new Date();
    return `${getYMD(date)} ${getH24MISS(date)}`;
};

const getYMD = (date: Date): string => {
    const yyyy = date.getUTCFullYear();
    let m = date.getUTCMonth();
    let mm = (++m).toString();

    if (m < 10) {
        mm = "0" + mm;
    }

    const d = date.getUTCDate();
    let dd = d.toString();
    if (d < 10) {
        dd = "0" + dd;
    }
    return `${yyyy}-${mm}-${dd}`;
};

const getH24MISS = (date: Date): string => {
    return [
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds(),
    ].map((el: number) => {
        if (el < 10) {
            return "0" + el;
        }
        return el.toString();
    }).join(":");
};

export {
    dtoToEntity,
    dtoToSetterEntity,
    entityToDTO,
    entityListToDTOList,
    getterEntityListToDTOList,
    getCurrentDate,
};
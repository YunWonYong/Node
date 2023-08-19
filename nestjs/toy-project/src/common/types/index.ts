import { DTOInteface } from "../interface";

export type ObjectType<T> = {
    [key in string]: T;
};

export type RegistResultType<T> = {
    result: string,
    pk: T
};

export type ModifyResultType<T> = {
    affected: number
} & RegistResultType<T>;


export type ListResult<T extends DTOInteface> = {
    list: T[],
    total: number
};
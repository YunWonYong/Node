export type RegistResultType<T> = {
    result: string,
    pk: T
};

export type ModifyResultType<T> = {
    affected: number
} & RegistResultType<T>;


export type ListResult = {
    list: any[],
    total: number
};
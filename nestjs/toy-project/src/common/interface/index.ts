interface EntityInterface {}
interface EntitySetterInterface {
    set(key: string, value: any): void;
}

interface EntityGetterInterface {
    get<T extends DTOInteface>(dto: T): T;
}

interface DTOInteface {}


export {
    EntityInterface,
    EntitySetterInterface,
    EntityGetterInterface,
    DTOInteface
}
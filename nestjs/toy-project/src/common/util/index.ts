import { DTOInteface, EntityInterface } from "../interface";

function dtoToEntity<F extends DTOInteface, T extends EntityInterface>(from: F, to: T) {
    Object.keys(from).forEach((key: string) => {
        // [TODO] 다른 방법 찾아보기
        eval(`to["${key}"] = from["${key}"];`);
    });
    return to;
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
    getCurrentDate
};
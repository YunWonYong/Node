const getError = (err: any): Error => isError(err)? err: new Error(`${JSON.stringify(err || "{}")}`);

const errorPrint = (job: string, err: any, msg?: string) => {
    console.error(job);

    if (hasValue(msg)) {
        console.error(msg);
    }

    console.error(getError(err).message);
};


const hasValue = (input: any): boolean => !(isUndefined(input) || isNull(input) || isEmpty(input));

const isEmpty = (input: any): boolean => input === "";
const isError = (input: any): boolean => input instanceof Error;
const isUndefined = (input: any): boolean => input === undefined;
const isNull = (input: any): boolean => input === null;
const isArray = (input: any): boolean => isUndefined(input) === false
                                            ? isNull(input) === false
                                                ? Array.isArray(input)
                                                : false
                                            : false;

export {
    getError,
    errorPrint,
    hasValue,
    isEmpty,
    isError,
    isUndefined,
    isNull,
    isArray
};
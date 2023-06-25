interface CustomException {
    getMessage(): string;
    getStatusCode(): number;
}

// enum CustomExceptionType {
//     SERVER,
//     DB,
//     REDIS,
//     NOT_FOUND
// }

abstract class AbstractCustomException implements CustomException {
    private readonly msg: string;
    private statusCode: number;
    constructor(msg: string, statusCode?: number) {
        this.msg = msg;        
        if (isNumber(statusCode) === false) {
            this.statusCode = 500;
            return;
        }

        this.statusCode = statusCode as number;
    }

    getMessage(): string {
        return this.msg;
    }
    getStatusCode(): number {
        return this.statusCode;
    }
}

class DuplicateException extends AbstractCustomException {
    constructor(msg: string) {
        super(`${msg} duplicated`, 205);
    }
}

class NotSupportedException extends AbstractCustomException {
    constructor(msg: string) {
        super(`${msg} not supported`, 403);
    }
}

class EmptyException extends AbstractCustomException {
    constructor(msg: string) {
        super(`${msg} empty`, 404);
    }
}

class NotFoundException extends AbstractCustomException {
    constructor(msg: string) {
        super(`${msg} not found`, 404);
    }   
}

class ServerException extends AbstractCustomException {
    constructor(msg: string) {
        super(msg);
    }
}

const getError = (err: any): Error => isError(err)? err: new Error(`${JSON.stringify(err || "{}")}`);

const getCustomException = (err: any): CustomException => {
    if (err instanceof Error) {
        return new ServerException(err.message);
    } else if (isCustomError(err) === false) {
        return new NotSupportedException(`getCustomException input err ${JSON.stringify(err)}`);
    }
    return err;
};

const errorPrint = (job: string, err: any, msg?: string) => {
    console.error(job);

    if (hasValue(msg)) {
        console.error(msg);
    }

    console.error(getError(err).message);
};


const hasValue = (input: any): boolean => !(isUndefined(input) || isNull(input) || isEmpty(input));

const isCustomError = (input: any): boolean => input instanceof AbstractCustomException;

const isNumber = (input: any): boolean => hasValue(input)
                                            ? !/[^0-9]/.test(input)
                                            : false;

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
    getCustomException,
    hasValue,
    isCustomError,
    isEmpty,
    isError,
    isUndefined,
    isNull,
    isArray
};

export {
    ServerException,
    NotFoundException,
    EmptyException,
    DuplicateException,
    NotSupportedException
};
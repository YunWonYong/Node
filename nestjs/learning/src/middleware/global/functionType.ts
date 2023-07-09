import { Request, Response, NextFunction } from "express";
const functionTypeLogger = (req: Request, res: Response, next: NextFunction) => {
    console.log("function type global logger... DI (X)");
    next();
}

const GlobalLogger = functionTypeLogger;

export {
    GlobalLogger    
};
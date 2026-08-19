import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req:Request, res:Response, next: NextFunction){
    console.log(`Estás ejecutando un método ${req.method} en la ruta ${req.url} en la fecha ${new Date().toLocaleString('es-AR')}`,
    );
    next();
}
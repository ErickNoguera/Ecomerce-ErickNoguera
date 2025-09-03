import { NextFunction, Request, Response } from "express";

export function loggerGlobal(req:Request, res:Response, next:NextFunction){
    const date = new Date()
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()

    const time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    console.log(`Estas ejecutando el metodo ${req.method} en la ruta ${req.url} el dia ${day}/${month}/${year} a las ${time}`);

    next();
}
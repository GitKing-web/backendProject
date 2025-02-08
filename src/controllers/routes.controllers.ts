import type { Request, Response } from "express";

export const sayHola = (req: Request, res: Response) => {
    res.send('Hola from express and Bun')
}
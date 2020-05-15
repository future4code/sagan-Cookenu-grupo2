import { Request, Response } from "express";
import { HashManager } from "../services/HashManager";
import { CookenuUserDatabase } from "../data/CookenuUserDatabase";
import { Authenticator } from "../services/Authenticator";

export const loginEndpoint = async (req: Request, res: Response) => {
    try{
        const data = {
            email: req.body.email,
            password: req.body.password
        }
        const cookenuUserDatabase = new CookenuUserDatabase()
        const user = await cookenuUserDatabase.getUserByEmail(data.email)

        const hashManager = new HashManager()
        const compareResult = await hashManager.compare(
            data.password,
            user.password
        )
        if(!compareResult){
            throw new Error("Senha incorreta")
        }

        const authenticator = new Authenticator()
        const token = authenticator.generationToken({
            id: user.id,
            role: user.role
        })

        res.status(200).send({token})

    } catch (err){
        res.status(400).send({
            message: err.message
        })
    }
}
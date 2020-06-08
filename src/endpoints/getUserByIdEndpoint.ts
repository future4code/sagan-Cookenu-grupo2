import { Request, Response } from "express";
import { CookenuUserDatabase } from "../data/CookenuUserDatabase";
import { Authenticator } from "../services/Authenticator";

export const getUserByIdEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string
        const id = req.params.id

        //const authenticator = new Authenticator()
        //const userData = authenticator.verify(token)

        const cookenuUserDatabase = new CookenuUserDatabase()
        const user = await cookenuUserDatabase.getUserById(id)

        res.status(200).send({
            id: user.id,
            name: user.name,
            email: user.email
        })

    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}
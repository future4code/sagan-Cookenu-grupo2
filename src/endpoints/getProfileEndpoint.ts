import { Request, Response } from "express";
import { CookenuUserDatabase } from "../data/CookenuUserDatabase";
import { Authenticator } from "../services/Authenticator";

export const getProfileEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string

        const authenticator = new Authenticator()
        const userData = authenticator.verify(token)

        const cookenuUserDatabase = new CookenuUserDatabase()
        const user = await cookenuUserDatabase.getUserById(userData.id)

        res.status(200).send({
            id: user.id,
            email: user.email,
            name: user.name
        })

    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}
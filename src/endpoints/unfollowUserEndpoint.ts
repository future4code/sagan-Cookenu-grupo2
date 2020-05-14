import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { CookenuFollowDatabase } from "../data/CookenuFollowDatabase";

export const unfollowUserEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string

        const userToFollowId = req.body.userToFollowId
        if(!userToFollowId || userToFollowId === ""){
            throw new Error("Informe o usuario para seguir!")
        }

        const authenticator = new Authenticator()
        const userData = authenticator.verify(token)
        
        const cookenuFollowDatabase = new CookenuFollowDatabase()
        await cookenuFollowDatabase.createUserToFollow(
            userData.id,
            userToFollowId
        )

        res.status(200).send({
            message: "Stalker feito com sucesso!"
        })

    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}
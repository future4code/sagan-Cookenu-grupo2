import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { CookenuFollowDatabase } from "../data/CookenuFollowDatabase";

export const unfollowUserEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string

        const userToUnfollowId = req.body.userToUnfollowId
        if(!userToUnfollowId || userToUnfollowId === ""){
            throw new Error("Informe o usuario para deixar de seguir!")
        }

        const authenticator = new Authenticator()
        const userData = authenticator.verify(token)
        
        const cookenuFollowDatabase = new CookenuFollowDatabase()
        await cookenuFollowDatabase.deleteUserFollow(
            userData.id,
            userToUnfollowId
        )

        res.status(200).send({
            message: "Voce deixou de stalkerar essa pessoa!"
        })

    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}
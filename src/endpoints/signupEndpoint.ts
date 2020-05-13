import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { CookenuUserDatabase } from "../data/CookenuUserDatabase";
import { Authenticator } from "../services/Authenticator";

export const signupEndpoint = async(req: Request, res: Response) => {
    try{
        const email = req.body.email
        const name = req.body.name
        const password = req.body.password
    
        if(password.length < 6){
            throw new Error("A senha deve ser maior que 6 caracteres")
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const hashManager = new HashManager()
        const hashPassword = await hashManager.hash(password)

        const cookenuUserDatabase = new CookenuUserDatabase()
        await cookenuUserDatabase.createUser(
            id,
            email,
            name,
            hashPassword
        )

        const authenticator = new Authenticator()
        const token = authenticator.generationToken(
            {id}
        )

        res.status(200).send({token})


    } catch(err){

        res.status(400).send({
            messenge: err.messenge
        })
    }



    
}
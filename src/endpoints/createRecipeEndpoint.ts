import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { CookenuRecipeDatabase } from "../data/CookenuRecipeDatabase";
import { Authenticator } from "../services/Authenticator";

export const createRecipeEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string
        
        const recipeData = {
            title: req.body.title,
            description: req.body.description
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const authenticator = new Authenticator()
        const userData = authenticator.verify(token)


        const cookenuRecipeDatabase = new CookenuRecipeDatabase()
        await cookenuRecipeDatabase.createRecipe(
            id,
            recipeData.title,
            recipeData.description,
            new Date(),
            userData.id
        )

        res.status(200).send({
            message: "Receita criada com sucesso!"
        })

    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}
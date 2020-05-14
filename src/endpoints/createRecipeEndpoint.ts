import { Request, Response } from "express";
import { IdGenerator } from "../services/IdGenerator";
import { CookenuRecipeDatabase } from "../data/CookenuRecipeDatabase";
import { Authenticator } from "../services/Authenticator";
import moment from "moment"

export const createRecipeEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string
        
        const recipeData = {
            title: req.body.title,
            description: req.body.description,
            creationDate: req.body.creationDate
        }

        const idGenerator = new IdGenerator()
        const id = idGenerator.generatorId()

        const authenticator = new Authenticator()
        const userData = authenticator.verify(token)

        const transformDateFormate = moment(recipeData.creationDate, "DD/MM/YYYY").toDate()
        const creationDateFormatted = new Date(transformDateFormate)

        const cookenuRecipeDatabase = new CookenuRecipeDatabase()
        await cookenuRecipeDatabase.createRecipe(
            id,
            recipeData.title,
            recipeData.description,
            creationDateFormatted,
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
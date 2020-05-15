import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { CookenuRecipeDatabase } from "../data/CookenuRecipeDatabase";
import moment from 'moment';

export const getRecipeByIdEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string
        const id = req.params.id

        //const authenticator = new Authenticator()
        //const userData = authenticator.verify(token)

        const cookenuRecipeDatabase = new CookenuRecipeDatabase()
        const recipe = await cookenuRecipeDatabase.getRecipeById(id)

        const dateFormatted = moment(recipe.creation_date).format("DD/MM/YYYY")

        res.status(200).send({
            id: recipe.id,
            title: recipe.title,
            description: recipe.description,
            cratedAt: dateFormatted
        })

    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}
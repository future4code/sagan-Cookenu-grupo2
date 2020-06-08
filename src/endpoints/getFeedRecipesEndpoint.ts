import { Request, Response } from "express";
import { Authenticator } from "../services/Authenticator";
import { CookenuRecipeDatabase } from "../data/CookenuRecipeDatabase";

export const getFeedRecipesEndpoint = async (req: Request, res: Response) => {
    try{
        const token = req.headers.authorization as string

        const authenticator = new Authenticator()
        const userData = authenticator.verify(token)

        const cookenuRecipeDatabase = new CookenuRecipeDatabase()
        const feed = await cookenuRecipeDatabase.getFeedRecipes(userData.id)
        
        res.status(200).send({
            recipes: feed
        })

    } catch(err){
        res.status(400).send({
            message: err.message
        })
    }
}

// "b35ffafd-258c-4f57-a691-fac046109aab"
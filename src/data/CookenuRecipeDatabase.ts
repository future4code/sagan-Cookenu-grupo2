import { BaseDatabase } from "./BaseDatabase";

export class CookenuRecipeDatabase extends BaseDatabase{

    private static TABLE_NAME: string = "CookenuRecipes"

    public async createRecipe(
        id: string,
        title: string,
        description: string,
        creationDate: Date,
        userId: string
    ): Promise<void> {
        await this.connection()
            .insert({
                id,
                title,
                description,
                creation_date: creationDate,
                user_id: userId
            })
            .into(CookenuRecipeDatabase.TABLE_NAME)
        console.log("Receita criada com sucesso!")
    }


}
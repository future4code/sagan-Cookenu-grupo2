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

    public async getRecipeById(id: string): Promise<any>{
        const result = await this.connection()
            .select("*")
            .from(CookenuRecipeDatabase.TABLE_NAME)
            .where({id})
        return result[0]
    }


}
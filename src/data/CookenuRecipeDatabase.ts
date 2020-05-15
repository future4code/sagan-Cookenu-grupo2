import { BaseDatabase } from "./BaseDatabase";
import moment from 'moment';

export class CookenuRecipeDatabase extends BaseDatabase {

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

    public async getRecipeById(id: string): Promise<any> {
        const result = await this.connection()
            .select("*")
            .from(CookenuRecipeDatabase.TABLE_NAME)
            .where({ id })
        return result[0]
    }

    public async getFeedRecipes(
        id: string
    ): Promise<any> {
        const result = await this.connection().raw(`
        SELECT
            f.user_to_follow_id,
            u.name,
            r.id as recipe_id,
            r.title,
            r.description,
            r.creation_date
        FROM CookenuRecipes r
        JOIN CookenuUserFollow f ON r.user_id = f.user_to_follow_id
        JOIN CookenuUser u ON f.user_to_follow_id = u.id
        WHERE f.user_id = "${id}";
        `)
        const feed = []
        for (const item of result[0]){
            const creationDateFormated = moment(item.creation_date).format("DD/MM/YYYY")
            feed.push({
                id: item.recipe_id,                
                title: item.title,
                description: item.description,
                createdAt: creationDateFormated,
                userId: item.user_to_follow_id,
                userName: item.name
            })
        }
        return feed

    }

}


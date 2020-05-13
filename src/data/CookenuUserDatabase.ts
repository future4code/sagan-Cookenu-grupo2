import { BaseDatabase } from "./BaseDatabase";

export class CookenuUserDatabase extends BaseDatabase{
    
    private static TABLE_NAME: string = "CookenuUser"

    //conferir conteúdo de tabelas já criadas
    public async getTableContent(table_name: string): Promise<any> {
        const result = await this.connection()(`${table_name}`)
            .select("*")
        return result
    }

    public async createUser(
        id: string,
        email: string,
        name: string,
        password: string
    ): Promise<void> {
        await this.connection()
            .insert({
                id,
                email,
                name,
                password
            })
            .into(CookenuUserDatabase.TABLE_NAME)
        console.log("Usuário criado com sucesso!")
    }

    public async getUserByEmail(email: string): Promise<any>{
        const result = await this.connection()
            .select("*")
            .from(CookenuUserDatabase.TABLE_NAME)
            .where({email})
        return result[0]
    }


}
import { BaseDatabase } from "./BaseDatabase";

export class CookenuFollowDatabase extends BaseDatabase{

    private static TABLE_NAME: string = "CookenuFollow"

    public async createUserToFollow(
        userId: string,
        userToFollowId: string
    ): Promise<void> {
        await this.connection()
            .insert({
                user_id: userId,
                user_to_follow_id: userToFollowId
            })
            .into(CookenuFollowDatabase.TABLE_NAME)
        console.log("Stalker eh crime")
    }    
}
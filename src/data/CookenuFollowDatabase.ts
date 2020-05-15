import { BaseDatabase } from "./BaseDatabase";

export class CookenuFollowDatabase extends BaseDatabase{

    private static TABLE_NAME: string = "CookenuUserFollow"

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

    public async deleteUserFollow(
        userId: string,
        userToUnfollowId: string
    ): Promise<void>{
        await this.connection()
            .delete()
            .from(CookenuFollowDatabase.TABLE_NAME)
            .where({user_id: userId}).and.where({user_to_follow_id: userToUnfollowId})
        console.log("Stalker deletado!")
    }
}
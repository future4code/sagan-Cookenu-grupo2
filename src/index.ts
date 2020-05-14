import express from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { signupEndpoint } from "./endpoints/signupEndpoint";
import { loginEndpoint } from "./endpoints/loginEndpoint";
import { getProfileEndpoint } from "./endpoints/getProfileEndpoint";
import { createRecipeEndpoint } from "./endpoints/createRecipeEndpoint";

dotenv.config();

const app = express();
app.use(express.json());


// const newCookenuUserDatabase = new CookenuUserDatabase()
// async function main(){
//     console.log(await newCookenuUserDatabase.getTableContent("CookenuUser"))
// }
// main()



app.post("/signup", signupEndpoint)
app.post("/login", loginEndpoint)
app.post("/create-recipe", createRecipeEndpoint)

app.get("/user/profile", getProfileEndpoint)


const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});

import express, { Request, Response } from "express";
import { AddressInfo } from "net";
import dotenv from "dotenv";
import { CookenuUserDatabase } from "./data/CookenuUserDatabase";
import { signupEndpoint } from "./endpoints/signupEndpoint";
import { loginEndpoint } from "./endpoints/loginEndpoint";

// import { IdGenerator } from "./service/IdGenerator";
// import { UserDatabase } from "./data/UserDatabase";
// import { Authenticator } from "./service/Authenticator";

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



// =======================================================


const server = app.listen(process.env.PORT || 3000, () => {
    if (server) {
        const address = server.address() as AddressInfo;
        console.log(`Server is running in http://localhost:${address.port}`);
    } else {
        console.error(`Failure upon starting server.`);
    }
});

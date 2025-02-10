import { Router } from "express";
import { registerUser } from "../controllers/user.controllers";

const userRouter = Router();

userRouter.route('/').get((req, res) => {res.send("hello")} )

//public routes
userRouter.route('/auth/register').post(registerUser);
userRouter.route('/login').get((req, res) => {res.send({msg: "duck"})});
// userRouter.route('/refresh-access-token').post();

// //private routes
// userRouter.route('/logout').post();
// userRouter.route('/edit/avatar').post();
// userRouter.route('/get-user').post();


export {userRouter}
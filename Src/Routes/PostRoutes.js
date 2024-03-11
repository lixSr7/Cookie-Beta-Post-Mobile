import { Router } from "express";
import PostController from "../Controllers/PostController.js";


//* Defino los Enpoints

const routerPost = Router();

routerPost.get('/', PostController.read); //* Recover all post
routerPost.post('/', PostController.create);//* Create new post
routerPost.get('/:id', PostController.readUnique)//* Recover unique post
routerPost.put('/:id', PostController.update);//* update a post
routerPost.delete('/:id', PostController.delete);//* Delete a post

export default routerPost;
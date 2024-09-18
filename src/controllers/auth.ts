import { RequestHandler } from "express";
import { z } from "zod";
import * as auth from "../services/auth";

export const login: RequestHandler = (req, res) => {
	const loginSchema =z.object({
        password: z.string()
    });
    const body = loginSchema.safeParse(req.body);
    if(!body.success) return res.json({error: 'Donne pas valide'});

    if(auth.validatePassoword(body.data.password)){
        return res.json({token: auth.createToken()});
    }
    res.status(403).json({error: 'access denied'})
}
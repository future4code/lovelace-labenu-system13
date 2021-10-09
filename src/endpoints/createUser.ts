import { Request, Response } from "express";
import { connection } from "../data/connection";
import { user } from "../types";

export default async function createUser(
   req: Request,
   res: Response
): Promise<void> {
   try {

      const { name, nickname, inicio, termino, modulo } = req.body

      if (!name || !nickname || !inicio|| !termino || !modulo) {
         res.statusCode = 422
         throw "'name', 'nickname', ' inicio', ' termino', 'modulo', são obrigatórios"
      }

      const id: string = Date.now().toString()

      const newUser: user = { id, name, inicio,  termino, modulo }

      await connection('TURMAS').insert(newUser)

      res.status(201).send("Usuário criado!")

   } catch (error) {

      if (typeof error === "string") {

         res.send(error)
      } else {
         
        // console.log(error.sqlMessage || error.message);
         res.status(500).send("Ops! Um erro inesperado ocorreu =/")
      }

   }
}
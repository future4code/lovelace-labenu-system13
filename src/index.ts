import express, {Request, Response } from "express";
import cors from "cors"
import knex from "knex"
import dotenv from "dotenv"
import {AddressInfo} from "net"


dotenv.config()

export const connection = knex({
    client: "mysql",
    connection:{
        host: process.env.DB_HOST,
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    }
})
  

const app =express()
app.use(express.json())
app.use(cors())

        enum TIPO_TURMA{
            INTEGRAL ="integral",
            NOTURNO ="noturno"
        }



    type criaTurmaInput={
        id: number,
        nome: string,
        inicio: string,
        termino: string,
        modulo: number,
        tipo: TIPO_TURMA

    }



        app.post("/turma", async(req: Request, res: Response)=>{
            let errorCode = 400
            try{
                    const input: criaTurmaInput={
                        id: req.body.id,
                        nome: req.body.nome,
                        inicio: req.body.inicio,
                        termino: req.body.termino,
                        modulo: 0,
                        tipo: req.body.tipo
                    }
            if(!input.id || input.nome || input.inicio || input.termino || input.tipo){
                errorCode = 422
                throw new Error("preencha os campos corretamente")
            }

            if(input.tipo! == TIPO_TURMA.INTEGRAL && input.tipo ! ==TIPO_TURMA.NOTURNO){
                errorCode = 422
                throw new Error("os valores possiveis são'integral' ou 'noturno'")
            }

            await connection.raw(`
            INSERT INTO TURMA(id, nome, inicio, termino, modulo)
            VALUES(
                 ${input.id},
                "${input.nome}",
                "${input.inicio}",
                "${input.termino}",
                 ${input.modulo}
            )
            
            `)
            res.status(201).send({message:"turma criada com sucesso"})

            }catch(error){
               // res.status(errorCode).send({message:error.message})
            }
        })



const server = app.listen(process.env.PORT || 3003, ()=>{
    if(server){
        const adress =server.address() as AddressInfo
        console.log(`servidor rodando na porta http://localhost:${adress.port}`)

    }else{
        console.log(`carregamento falhou`)
    }
})
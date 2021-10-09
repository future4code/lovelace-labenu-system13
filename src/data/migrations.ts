import { connection } from "./connection"
import users from "./users.json"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTables = () => connection
   .raw(`

      CREATE TABLE   TURMAS (
         id VARCHAR(255) PRIMARY KEY,
         name VARCHAR(255) NOT NULL,
         inicio VARCHAR(255) NOT NULL,
         termino VARCHAR(255) NOT NULL,
         modulo INT NOT NULL
         );


         CREATE TABLE ALUNOS-TURMAS(
         professores-responsaveis VARCHAR(255) NOT NULL,
         email VARCHAR(255) UNIQUE NOT NULL
         
      );
   `)
   .then(() => { console.log("Tabelas criadas") })
   .catch(printError)

const insertUsers = () => connection("TURMAS")
   .insert(users)
   .then(() => { console.log("Usuários criados") })
   .catch(printError)

const closeConnection = () => { connection.destroy() }

createTables()
   .then(insertUsers)
   .finally(closeConnection)
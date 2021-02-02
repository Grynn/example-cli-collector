//Database migration:
//Create table schema

const SQL = require('sql-template-strings');
import * as db from "./db/index";

const sql = SQL`
create table if not exists tbl_movies (
    id               int autoincrement,
    date_checked     timestamp not null,
    title            varchar not null,
    rating           int not null);
`;


async function main() {
    await db.initDb();
    await db.db.exec() ...

    //run your sql.
}

//get a list of columns
//update tbl_movies... add column xyz
//create the schema

//close



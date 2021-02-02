//All database access code

export let db;

export async function initDb() {
    db = await (new SQLite("filename"));
}

export async writeRecord( record ) {
    //
}





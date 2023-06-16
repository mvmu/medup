const postgres = require("postgres");

function conectar(){
    return postgres({
        host : "localhost",
        port : 5433,
        database : "medup",
        user : "postgres",
        password : "Livirca04"
    });
}
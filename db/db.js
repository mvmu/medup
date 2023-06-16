const postgres = require("postgres");

function connect(){
    return postgres({
        host : "localhost",
        port : 5433,
        database : "medup",
        user : "postgres",
        password : "Livirca04"
    });
}
// All the functions will be managed in an asyncronous way, as it is a DB connection

// a function to fetch all the data from a table given as a parameter. 
async function getTableData(tableName){
    //open the connection
        let connection = await connect();

        try{
            //data variable containing the query result
            let data = await connection(`SELECT * FROM ${tableName}`);
            return data;
        }catch(error){
            // in case of error, print a log message
            console.log(`an error occurred trying to fetch data from table ${tableName}`, error);
            // return an empty result
            return [];
        }finally{
            //close the connection
            connection.end();  
        }
    };
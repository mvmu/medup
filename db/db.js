const postgres = require("postgres");

function connect(){
    return postgres({
        host : "localhost",
        port : 5433,
        database : "medup",
        user : "postgres",
        password : "root"
    });
}
// All the functions will be managed in an asyncronous way, as it is a DB connection

// a function to fetch all the data from a table given as a parameter, general function to apply in many cases:
// - search Doctors 
// - search Appointments
async function getTableData(tableName){
    //open the connection
        let sql = connect();

        try{
            //data variable containing the query result. Postgres library requires the following syntax to pass parameters
            let data = await sql`SELECT * FROM ${sql(tableName)}`;

            return data;

        }catch(error){
            // in case of error, print a log message
            console.log(`an error occurred trying to fetch data from table ${tableName}`, error);

            // return an empty result
            return [];
            
        }finally{
            //close the connection
            sql.end();  
        }
    };

//this function returns a boolean. True: succesfully deleted | False: otherwise
async function deleteRecord(id, tableName){
    let sql = connect();

    try{
        // 
        let result = await sql`DELETE from ${sql(tableName)} WHERE id = ${id}`;

        // check if the row has been deleted
        return result.count > 0;

    }catch(error){
        console.log(`an error occurred trying to delete data with id: ${id} from table: ${tableName}`, error);
        return false;
        
    }finally{
        //close the connection
        sql.end(); 
    }
};

async function findDoctorsByCategory(category_id){
    let sql = connect();

    try{
        let data = await sql `SELECT id, name, surname, email, medical_center FROM doctor WHERE category_id = ${category_id}`;

        return data;

    }catch(error){
        // in case of error, print a log message
        console.log(`an error occurred trying to fetch doctors with category: ${category_id}`, error);

        // return an empty result
        return [];
        
    }finally{
        //close the connection
        sql.end();  
    }
}

async function findDoctors(){
    let sql = connect();

    try{
        let data = await sql `SELECT id, name, surname, email, medical_center FROM doctor`;

        return data;

    }catch(error){
        // in case of error, print a log message
        console.log('an error occurred trying to fetch doctors', error);

        // return an empty result
        return [];
        
    }finally{
        //close the connection
        sql.end();  
    }
}

module.exports = {getTableData, deleteRecord, findDoctorsByCategory, findDoctors};
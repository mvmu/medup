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

async function getUserAppointments(userId) {
    let sql = connect();

        try{
            //data variable containing the query result. Postgres library requires the following syntax to pass parameters
            let data = await sql`SELECT doctor.name as doctor_name, doctor.surname as doctor_surname, doctor.medical_center, category.value as category, status.value as status, appointment_date, appointment_time, patient_note, doctor_note 
            FROM appointment
                INNJER JOIN doctor ON doctor_id = doctor.id
                INNER JOIN category ON doctor.category_id = category.id
                INNER JOIN status ON status_id = status.id
            WHERE patient_id = ${userId} AND status_id != 3 AND appointment_date >= now()
            ORDER BY appointment_date ASC, appointment_time ASC`;

            //the query always return an array, but in this case we'll always have a single result. So we return the first and only element of the array
            return data;

        }catch(error){
            // in case of error, print a log message
            console.log('an error occurred trying to fetch data from patient table', error);

            // return an empty result
            return [];
            
        }finally{
            //close the connection
            sql.end();  
        }
}

async function getUserInfo(userId) {
    let sql = connect();

        try{
            //data variable containing the query result. Postgres library requires the following syntax to pass parameters
            let data = await sql`SELECT name, surname, email, birth_date, gender FROM patient WHERE id = ${userId}`;

            //the query always return an array, but in this case we'll always have a single result. So we return the first and only element of the array
            return data[0];

        }catch(error){
            // in case of error, print a log message
            console.log('an error occurred trying to fetch data from patient table', error);

            // return an empty result
            return null;
            
        }finally{
            //close the connection
            sql.end();  
        }
}

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

async function findTimeSlotsByDoctorAndDate(doctor_id, date){
    let sql = connect();

    try{
        let data = await sql `SELECT appointment_time FROM appointment WHERE doctor_id = ${doctor_id} AND appointment_date = ${date}`;

        // convert the array results of objects into an array of strings, cutting the time to return just hour and minute (hh:mm)
        return data.map(element => element.appointment_time.slice(0, 5));

    }catch(error){
        // in case of error, print a log message
        console.log(`an error occurred trying to fetch time slots for the doctor: ${doctor_id}`, error);

        // return an empty result
        return [];
        
    }finally{
        //close the connection
        sql.end();  
    }
}

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
// data is the response.body from the Frontend
async function saveAppointment(data){
    let sql = connect();
    
    try{
        //all the appointments are saved with status id = 1 (pending)
        let result = await sql`INSERT INTO appointment (patient_id, doctor_id, status_id, appointment_date, appointment_time, patient_note) 
                                VALUES (${data.patient_id},${data.doctor_id},1,${data.appointment_date}, ${data.appointment_time}, ${data.patient_note})`;

        // check if the appointment has been added with a boolean
        return result.count > 0;

    }catch(error){
        // in case of error, print a log message
        console.log('an error occurred trying to save the appointment', error);

        // return false boolean if something went wrong (because the return type of the function is a boolean)
        return false;
        
    }finally{
        //close the connection
        sql.end();  
    }
}

module.exports = {getTableData, deleteRecord, findTimeSlotsByDoctorAndDate, findDoctorsByCategory, findDoctors, getUserInfo, getUserAppointments, saveAppointment};
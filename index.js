//constant to use express
const express = require('express');

//constant to use body parser(objects)
const bodyParser = require('body-parser');

//constant to use sessions
const session = require('express-session');

//to let it work on localhost
const cors = require('cors');

// constant server to connect it through express
const server = express();

//constant to import the functions from the DB configuration
const {getTableData, deleteRecord, findTimeSlotsByDoctorAndDate, findDoctorsByCategory, findDoctors, getUserInfo, getUserAppointments, saveAppointment} = require("./db/db");

// USE MIDDLEWARE
server.use(bodyParser.urlencoded({
    extended: true
  }));
server.use(bodyParser.json());
server.use(cors());

//middleware to avoid CORS policy issues
server.use((request, response, next) => {
    response.header("Access-Control-Allow-Origin","*");
    response.header("Accept", "application/json");
    response.header("Content-Type", "application/json");
    next();
});

// GET MIDDLEWARE
server.get("/appointments/:userId", async (request, response) => {
    // a variable to store all the future appointments
    let result = await getUserAppointments(request.params.userId);
    //result is the body 
    response.send(result);
});

server.get("/appointments/occupied/:doctorId/:date", async (request, response) => {
    // a variable to store all the occupied time slots from a doctor and a date
    let result = await findTimeSlotsByDoctorAndDate(request.params.doctorId, request.params.date);
    //result is the body 
    response.send(result);
});

server.get("/doctors", async (request, response) => {
    // a variable to store all the doctors
    let result = await findDoctors();
    //result is the body 
    response.send(result);
});

server.get("/doctors/:category_id", async (request, response) => {
    // a variable to store all the doctors, sorted by category
    let result = await findDoctorsByCategory(request.params.category_id);
    //result is the body 
    response.send(result);
});

server.get("/categories", async (request, response) => {
    // a variable to store all the categories, using the table name as a string
    let result = await getTableData("category");
    //result is the body 
    response.send(result);
})

server.get("/user/:userId", async (request, response) => {
    let result = await getUserInfo(request.params.userId);
    response.send(result);
})

// server.delete("/sector/:id", async (request, response) => {
//     let isDeleted = await deleteRecord(request.params.id, "sector");
//     if(isDeleted){
//         response.status(200);
//         // return an object with a descriptive message, important to use in Front
//         response.send({message:"sector succesfully deleted"});
//     }else{
//         // send the 404 error (not found)
//         response.status(404);
//         response.send({message:"ops, something went wrong while deleting"});
//     }
// });

// POST MIDDLEWARE
server.post("/appointments", async (request, response) => {
    // a variable to store the result of saved appointment (through form)
    let saved = await saveAppointment(request.body);
    if(saved){
        response.sendStatus(200);
    }else{
        response.sendStatus(400);
    }
});



server.listen(4000);
//constant to use express
const express = require('express');

//constant to use body parser(objects)
const bodyParser = require('body-parser');

//constant to enable sessions
const session = require('express-session');

//constant to let it work on localhost
const cors = require('cors');

//constant to use read + cookies sent from the app for the session
const cookieParser = require('cookie-parser');

//constant server to connect it through express
const server = express();

//constant to import the functions from the DB configuration
const {logIn, getTableData, findTimeSlotsByDoctorAndDate, findDoctorsByCategory, findDoctors, getUserInfo, getUserAppointments, saveAppointment, updateAppointment, getHistoryData, cancelAppointment} = require("./db/db");

//constant to apply into the key 'secret', when creating 'use' middleware for storing sessions
const SECRET = "cei-final-project";


// USE MIDDLEWARE
// middleware to use body-parser
server.use(bodyParser.urlencoded({
    extended: true
  }));
server.use(bodyParser.json());

// middleware to use cookies
server.use(cookieParser(SECRET));

//middleware to avoid CORS policy issues
server.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// middleware to store session, using express-session library
server.use(session({ 
    secret : SECRET,
    resave : true,
    saveUninitialized : true,
    cookie: {
        secure: false
    }
}));

// GET ENDPOINTS
// endpoint to get the logged user id
server.get("/getUserSession", (request,response) => { 
    if(request.session.sessionUser) {
        response.send(request.session.sessionUser);
    } else {
        response.sendStatus(401);
    }
});

server.get("/doctor/appointments", async (request, response) => {
    // a variable to store all the future appointments
    let result = await getUserAppointments(request.session.sessionUser.userId, true);
    //result is the body 
    response.send(result);
});

server.get("/patient/appointments", async (request, response) => {
    // a variable to store all the future appointments
    let result = await getUserAppointments(request.session.sessionUser.userId, false);
    //result is the body 
    response.send(result);
});

server.get("/appointments/occupied/:doctorId/:date", async (request, response) => {
    // a variable to store all the occupied time slots from a doctor and a date
    let result = await findTimeSlotsByDoctorAndDate(request.params.doctorId, request.params.date);
    //result is the body 
    response.send(result);
});

server.get("/appointments/history", async (request, response) => {
    // constant idToQuery to search into the right id column, based on the user session role
    const idToQuery = request.session.sessionUser.isDoctor ? 'doctor_id' : 'patient_id';
    let result = await getHistoryData(idToQuery, request.session.sessionUser.userId);
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

server.get("/user", async (request, response) => {
    let result = await getUserInfo(request.session.sessionUser);
    response.send(result);
})

server.get("/logout", (request, response) => {
    console.log("Logging out user:", request.session.sessionUser)
    request.session.destroy();
    response.sendStatus(200);
})

// POST ENDPOINTS
server.post("/appointments", async (request, response) => {
    // a variable to store the result of saved appointment (through form)
    let saved = await saveAppointment(request.body, request.session.sessionUser.userId);
    if(saved){
        response.sendStatus(200);
    }else{
        response.sendStatus(400);
    }
});

server.post("/login", async (request, response) => {
    const isDoctor = request.body.isDoctor;
    const user = await logIn(request.body);
    if(user){
        const userId = user.id;
        console.log(`user with id ${userId} logged successfully`);
        // store the logged user ID into the session
        request.session.sessionUser = {userId, isDoctor};
        response.sendStatus(200);
    }else {
        response.sendStatus(401)
    }

});

// PUT ENDPOINTS
server.put("/appointment/update", async (request, response) => {
    // a variable to identify if the appointment has been updated or not
    let updated = await updateAppointment(request.body);
    if(updated){
        response.sendStatus(200);
    }else{
        response.sendStatus(400);
    }
})

server.put("/appointment/cancel/:appointment_id", async (request, response) => {
    // a variable to identify if the appointment has been updated or not
    let cancelled = await cancelAppointment(request.params.appointment_id);
    if(cancelled){
        response.sendStatus(200);
    }else{
        // send bad request status (400)
        response.sendStatus(400);
    }
})



server.listen(4000);
//constant to use express
const express = require('express');

//constant to use body parser(objects)
const bodyParser = require('body-parser');

//constant to enable sessions
const session = require('express-session');

//constant to let it work on localhost
const cors = require('cors');

//constant to use read cookies sent from the app for the session
const cookieParser = require('cookie-parser');

// constant server to connect it through express
const server = express();

//constant to import the functions from the DB configuration
const {logIn, getTableData, deleteRecord, findTimeSlotsByDoctorAndDate, findDoctorsByCategory, findDoctors, getUserInfo, getUserAppointments, saveAppointment} = require("./db/db");

const SECRET = "cei-final-project";

// USE MIDDLEWARE
server.use(bodyParser.urlencoded({
    extended: true
  }));
server.use(bodyParser.json());

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

// GET MIDDLEWARES
// middleware to get the logged user id
server.get("/getUserSession", (request,response) => { 
    if(request.session.sessionUser) {
        response.send(request.session.sessionUser);
    } else {
        response.sendStatus(401);
    }
});

server.get("/appointments", async (request, response) => {
    // a variable to store all the future appointments
    let result = await getUserAppointments(request.session.sessionUser.userId);
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

server.get("/user", async (request, response) => {
    let result = await getUserInfo(request.session.sessionUser);
    response.send(result);
})

server.get("/logout", (request, response) => {
    request.session.destroy(() => response.sendStatus(200));
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
    const userId = user.id;
    if(userId){
        console.log(`user with id ${userId} logged successfully`);
        // store the logged user ID into the session
        request.session.sessionUser = {userId, isDoctor};
        response.sendStatus(200);
    }else {
        response.sendStatus(401)
    }
} );


server.listen(4000);
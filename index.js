//constant to use express
const express = require('express');

//constant to use body parser(objects)
const bodyParser = require('body-parser');

//constant to use sessions
const session = require('express-session');

// constant server to connect it through express
const server = express();

//constant to import the functions from the DB configuration
const {getTableData, deleteRecord, findDoctorsByCategory, findDoctors} = require("./db/db");


server.get("/doctors/:category_id", async (request, response) => {
    // a variable to store all the sectors
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



server.listen(4000);
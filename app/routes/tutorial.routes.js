module.exports = app => {
    const tutorials = require("../controllers/tutorial.controller.js");
    const voters=require("../controllers/voter.controller.js");
    var router = require("express").Router();

    //Create a new Tutorial
    router.post("/", tutorials.create);

    //Retrieve all Tutorials
    router.get("/getAllTutorials/", tutorials.findAll);

    //retrieve all published Tutorials
    router.get("/published", tutorials.findAllPublished);

    
    //get Information of Tutorial and Voter
    router.get("/getInformationWithId/:id", tutorials.getInformationWithId);
    router.get("/getAllData/", tutorials.getAllData);
    router.get("/getAllVoters/",voters.findAll);
    router.get("/:id", tutorials.findOne);
    //set voter
    router.post("/setVoter", voters.create);
    // Update a Tutorial with id
    router.put("/tutorial_update/:id", tutorials.update);

    router.put("/voter_update/:id", voters.update);
   
    // Delete a Tutorial with id
    router.delete("/:id", tutorials.delete);

    // Delete all Tutorials
    router.delete("/", tutorials.deleteAll);

    app.use('/api/tutorials', router);
};
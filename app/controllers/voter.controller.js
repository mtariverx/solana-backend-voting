const db = require("../models");
const Voter = db.Voter;
const Op = db.Sequelize.Op;

//create and save a new Voter
exports.create = (req, res) => {
    // Validate request
    // console.log(req.body);
    if (!req.body.pubkey) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Voter
    const voter = {
        state: req.body.state,
        pubkey: req.body.pubkey,
        TutorialId: req.body.tutorial_id,
        token_kinds: req.body.token_kinds
    };

    // Save Voter in the database
    Voter.create(voter)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Voter."
            });
        });
};

//Retrieve all Voters from the database.

exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Voter.findAll({
            where: condition
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving voters."
            });
        });
};

// Find a single Voter with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Voter.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Voter with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Voter with id=" + id
            });
        });
};

// Update a Voter by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Voter.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Voter was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Voter with id=${id}. Maybe Voter was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Voter with id=" + id
            });
        });
};

// Delete a Voter with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Voter.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Voter was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Voter with id=${id}. Maybe Voter was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Voter with id=" + id
            });
        });
};

// Delete all voters from the database.
exports.deleteAll = (req, res) => {
    Voter.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Voters were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all voters."
            });
        });
};

// Find all published Voters
exports.findAllPublished = (req, res) => {
    Voter.findAll({
            where: {
                published: true
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving voters."
            });
        });
};

const db = require("../models");
const {
    Tutorial,
    Voter
} = db;
const Op = db.Sequelize.Op;

//create and save a new Tutorial
exports.create = (req, res) => {
    // Validate request
    // console.log(req.body)
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Tutorial
    const tutorial = {
        title: req.body.title,
        content: req.body.content,
        link: req.body.link,
        pubkey: req.body.pubkey,
        short_name: req.body.short_name,
        is_ended: req.body.is_ended

    };

    // Save Tutorial in the database
    Tutorial.create(tutorial)
        .then(data => {
            res.send(data);
            console.log('-create tutorial-', {
                data
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

//Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;
    console.log('------------------------here')
    Tutorial.findAll({
            where: condition,
            order: [
                ['createdAt', 'ASC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
            ],
            // order: sequelize.literal('createdAt ASC')
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });

};
// order: [
//     ['COLUMN_NAME_EXAMPLE', 'ASC'], // Sorts by COLUMN_NAME_EXAMPLE in ascending order
// ],
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Tutorial.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Tutorial with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Tutorial.update(req.body, {
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Tutorial.destroy({
            where: {
                id: id
            }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Tutorial.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({
                message: `${nums} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
    Tutorial.findAll({
            where: {
                published: true
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving tutorials."
            });
        });
};
// get tutorial and voter with tutorial id
exports.getInformationWithId = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const tutorial = await Tutorial.findByPk(id, {
            include: [Voter]
        });
        res.send(tutorial);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}

//get tutorial and voter
exports.getAllData = async (req, res) => {
    try {
        const tutorial = await Tutorial.findAll({
            order:[
                ['createdAt', 'ASC']
            ],
            include: [Voter]
        });
        res.send(tutorial);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}
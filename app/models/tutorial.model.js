module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("Tutorial", {
        title: {
            type: Sequelize.STRING
        },
        content: {
            type: Sequelize.TEXT
        },
        link: {
            type: Sequelize.STRING
        },
        pubkey: {
            type: Sequelize.STRING
        },
        short_name: {
            type: Sequelize.STRING
        },
        is_ended: {
            type: Sequelize.BOOLEAN
        }


    });

    Tutorial.associate = models => {
        Tutorial.hasMany(models.Voter);
    };

    return Tutorial;
};
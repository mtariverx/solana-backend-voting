module.exports = (sequelize, Sequelize) => {
    const Voter = sequelize.define("Voter", {
        state: {
            type: Sequelize.ENUM,
            values: ['vote', 'reject', 'rescined']
        },
        pubkey: {
            type: Sequelize.STRING
        },
        token_kinds: {
            type: Sequelize.TEXT
        }
    });

    Voter.associate = models => {
        Voter.belongsTo(models.Tutorial);
    };

    return Voter;
};
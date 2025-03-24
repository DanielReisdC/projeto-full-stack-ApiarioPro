module.exports = (sequelize, DataTypes) => {
    const Gestao = sequelize.define('Gestao', {
        ano: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mes: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        florada: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantidade_mes: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantidade_florada: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        tableName: 'gestao', // Evita pluralização automática
    });

    return Gestao;
};

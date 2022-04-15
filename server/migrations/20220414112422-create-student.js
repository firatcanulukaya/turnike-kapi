'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Students', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nameSurname: {
                type: Sequelize.STRING,
                allowNull: false
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            idCard: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            rfid: {
                type: Sequelize.STRING,
                allowNull: false
            },
            studentId: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            className: {
                type: Sequelize.STRING,
                allowNull: false
            },
            department: {
                type: Sequelize.STRING,
                allowNull: false
            },
            testResult: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Students');
    }
};
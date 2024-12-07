/** Load model for `members` table */
const userModel = require('../models/index').user;

/** Load operation from Sequelize */
const Op = require('sequelize').Op;

const bcrypt = require('bcrypt');
const saltRounds = 10;

/** Create function to get all users */
exports.getAllUser = async (request, response) => {
    const id = request.params.id;
    try {
        let userData = await userModel.findOne({where: {id: id}});

        if (!userData) {
            return response.status(404).json({
                status: "failure",
                message: `user with ID ${id} not found`
            })
        }
        return response.json({
            success: true,
            message: 'All users have been loaded',
            data: {
                id :userData.id,
                nama: userData.nama, 
                username: userData.username,
                role: userData.role,
            },
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message,
        });
    }
};


/** Create function to add a new user */
exports.addUser = async (request, response) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(request.body.password, saltRounds);

        let newUser = {
            nama: request.body.nama, 
            username: request.body.username,
            password: hashedPassword,
            role: request.body.role
        };

        const result = await userModel.create(newUser);
        return response.json({
            success: true,
            data: {
                id :result.id,
                nama: result.nama, 
                username: result.username,
                role: result.role,
            },
            message: 'New user has been inserted',
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message,
        });
    }
};


/** Create function to update a user */
exports.updateUser = (request, response) => {
    let dataUser = {
        role: request.body.role,
        username: request.body.username,
        nama: request.body.nama,
        password: request.body.password
    };

    let idUser = request.params.id; // Get the user ID from request params

    userModel.update(dataUser, { where: { id: idUser } })
        .then(([affectedRows]) => { // Sequelize returns an array [affectedRows, affectedData]
            if (affectedRows === 0) {
                return response.status(404).json({
                    success: false,
                    message: 'User not found or data is unchanged'
                });
            }

            // Now, fetch the updated user data
            return userModel.findOne({
                where: { id: idUser }
            })
            .then(updatedUser => {
                return response.json({
                    success: true,
                    message: 'User data has been updated',
                    data: updatedUser // Return the updated user data here
                });
            });
        })
        .catch(error => {
            return response.json({
                success: false,
                message: error.message
            });
        });
};


/** Create function to delete a user */
exports.deleteUser = async (request, response) => {
    try {
        let idUser = request.params.id; // Corrected: should be `id`

        await userModel.destroy({ where: { id: idUser } });
        return response.json({
            success: true,
            message: 'User has been deleted',
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        })
    }
}
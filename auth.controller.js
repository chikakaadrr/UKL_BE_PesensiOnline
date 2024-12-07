const express = require(`express`)

const md5 = require(`md5`)

const jwt = require(`jsonwebtoken`)

const user = require('../models/index').user; // Sesuaikan path dengan lokasi file model Anda
const bcrypt = require('bcrypt');
const saltRounds = 10;

const authenticate = async (request, response) => {
    try {
        const { username, password } = request.body;

        // Cari user berdasarkan username
        const dataUser = await user.findOne({ where: { username: username } });

        if (!dataUser) {
            return response.status(401).json({
                success: false,
                logged: false,
                message: 'Authentication failed. Invalid username or password.',
            });
        }

        // Bandingkan password plaintext dengan hash yang disimpan
        const isPasswordValid = await bcrypt.compare(password, dataUser.password);

        if (isPasswordValid) {
            // Jika valid, buat token JWT
            const payload = {
                id: dataUser.id,
                username: dataUser.username,
                role: dataUser.role,
            };
            const secret = 'mokleters'; // Pastikan secret disimpan dengan aman
            const token = jwt.sign(payload, secret, { expiresIn: '1h' });

            return response.status(200).json({
                success: true,
                logged: true,
                message: 'Login berhasil',
                token: token,
                data: payload,
            });
        } else {
            return response.status(401).json({
                success: false,
                logged: false,
                message: 'Authentication failed. Invalid username or password.',
            });
        }
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'An error occurred during authentication.',
            error: error.message,
        });
    }
};

module.exports = {authenticate}
const UserModel = require('../models/user');
const TokenModel = require('../models/token');
const bcrypt = require('bcryptjs');

const { loginValidation, registerValidation, validateConfirmPassword } = require('../validation/auth');

const TokenService = require('./tokenService');
const UserDto = require('../dtos/userDto');
const ApiError = require('../exeptions/api-error');

class UserService {
    async registration(params) {
        const { error } = registerValidation(params);
        if (error) throw ApiError.BadRequest(error.details[0].message);
        const { name, surname, email, password, username } = params
        const userExist = await UserModel.findOne({ email: email });

        if (userExist) throw ApiError.BadRequest(`User with email - ${email} alreary exist`);

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const initials = name.split('')[0] + surname.split('')[0];

        const userModel = new UserModel({
            name,
            surname,
            initials,
            email,
            username,
            password: hashedPassword
        });

        const savedUser = await userModel.save();
        return this._userSave(savedUser)
    }

    async login(params) {
        const { email, password } = params
        const { error } = loginValidation(params);
        console.log(error)
        if (error) throw ApiError.BadRequest(error.details[0].message);

        const user = await UserModel.findOne({ email: email });
        if (!user) throw ApiError.BadRequest(`Email is not a found`);

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) throw ApiError.BadRequest(`Wrong password`);
        return this._userSave(user)
    }

    async refreshToken(refreshToken) {
        if(!refreshToken) throw ApiError.UnauthorizedError()

        const user = await TokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await TokenService.findToken(refreshToken);

        if (!user || !tokenFromDB) throw ApiError.UnauthorizedError();

        const userData = await UserModel.findById(user._id);

        return this._userSave(userData)
    }

    async logout(refreshToken) {
        const token = await TokenService.removeToken(refreshToken);
        return token;
    }

    async _userSave (userData) {
        const userDto = new UserDto(userData);
        const tokens = await TokenService.generateTokens({...userDto});
        await TokenService.saveToken(userDto._id, tokens.refreshToken);
        return { user: userDto, ...tokens }
    }

    async addIdLikedPost (idUser, idPost) {
        const posts = await UserModel.findByIdAndUpdate(idUser, {
            $push: { favorites: idPost }
        }, {
            new: true,
            useFindAndModify: false
        })
        return posts
    }

    async deleteIdLikedPost (idUser, idPost) {
        const posts = await UserModel.findByIdAndUpdate(idUser, {
            $pull: { favorites: idPost }
        }, {
            new: true,
            useFindAndModify: false
        })
        return posts
    }

    async deleteUser (idUser, password) {
        const user = await UserModel.findById(idUser);
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) throw ApiError.BadRequest(`Wrong password`);

        const responseUser = await UserModel.findOneAndRemove({_id: idUser});
        const responseToken = await TokenModel.deleteOne({"user": idUser })
        return {
            userId: responseUser._id,
            tokenOk: responseToken.ok,
            message: 'User has been remove successfull'
        }
    }

    async uploadImage (idUser, file) {
        const { mimetype, filename, size } = file;

        const imageObject = {
            url: `${process.env.BACKEND_URL}/uploads/${filename}`,
            name: filename,
            mimetype,
            size: size,
            alt: 'alt image',
        }

        const uploadedImage = await UserModel.findByIdAndUpdate(
            { _id: idUser },
            { image: imageObject },
            {
                new: true,
                useFindAndModify: true 
            }
        );

        return imageObject;
    }

    async updateProfile(idUser, profile) {
        const updatedProfile = await UserModel.findByIdAndUpdate(idUser, {
            ...profile
        }, {
            new: true,
            useFindAndModify: false
        })
        return updatedProfile
    }

    async changePassword(idUser, data) {
        const { oldPassword, newPassword, confirmPassword } = data

        const user = await UserModel.findById(idUser);
        const validPass = await bcrypt.compare(oldPassword, user.password);
        if (!validPass) throw ApiError.BadRequest(`Wrong old password`);

        const isValid = validateConfirmPassword({ newPassword, confirmPassword })

        if (isValid.error) {
            throw ApiError.BadRequest('Bad request')
        }

        if (newPassword !== confirmPassword) throw ApiError.BadRequest('Passwords must be same');

        const salt = bcrypt.genSaltSync(10);
        const hashedNewPassword = await bcrypt.hash(newPassword, salt);

        const responseUser = await UserModel.findByIdAndUpdate(
            idUser,
            {   password: hashedNewPassword}, 
            {
                new: true,
                useFindAndModify: false
            }
        )

        return responseUser;
    }
}

module.exports = new UserService()

// $2a$10$2OXG6bNCcKL6XGyuZlBpRufzfDI0Bbz6ZoZzZ6vbcaE6N4gV/PCh6
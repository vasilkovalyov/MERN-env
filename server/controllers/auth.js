const UserService = require('../service/userService');

class AuthController {
    async login(req, res, next) {
        try {
            const { email, password } = req.body.params
            const userData = await UserService.login({ email, password });
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json({
                ...userData
            })
        } catch(e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch(e) {
            next(e)
        }
    }

    async registration(req, res, next) {
        try {
            const { name, surname, email, password, username } = req.body.params;
            const userData = await UserService.registration({ name, surname, email, password, username });
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json({
                ...userData
            });
        } catch(e) {
            next(e)
        }
    }

    async refreshToken(req, res, next) {
        try {
            const { refreshToken } = req.cookies;
            const userData = await UserService.refreshToken(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, { maxAge: 60 * 24 * 60 * 60 * 1000, httpOnly: true });
            res.json({
                ...userData
            });
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { idUser, password } = req.body;
            const user = await UserService.deleteUser(idUser, password);
            res.json(user)
        } catch(e) {
            next(e)
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json([1,2,3])
        } catch(e) {
            next(e)
        }
    }

    async uploadImage (req, res, next) {
        try {
            const idUser = req.body._id;
            const response = await UserService.uploadImage(idUser, req.file);
            res.json({
                message: 'Upload file success',
                image: response
            })
        } catch(e) {
            console.log(e)
            next(e)
        }
    }

    async updateProfile (req, res, next) {
        try {
            const { idUser, profile } = req.body;
            const response = await UserService.updateProfile(idUser, profile);
            res.json({
                message: 'Update profile success',
                data: response
            })
        } catch(e) {
            console.log(e)
            next(e)
        }
    }
    
    async changePassword (req, res, next) {
        try {
            const { idUser, data } = req.body
            const response = await UserService.changePassword(idUser, data);

            res.json({
                message: 'The password has been updated success',
                data: response
            })
        } catch(e) {
            next(e)
        }
    }

}

module.exports = new AuthController()

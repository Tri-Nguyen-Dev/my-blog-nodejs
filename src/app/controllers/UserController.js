import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import UserModel from '../models/User.js'
import TokenModel from './../models/Token.js';

class UserController {

    show = async (req, res) => {
        try {
            const user = await UserModel.findOne({ _id: req.params.userId })
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    signIn = async (req, res) => {
        try {
            const { email, password } = req.body

            const existingUser = await UserModel.findOne({ email })
            if (!existingUser) return res.status(404).json({ message: "User doesn't exist!" })

            const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

            if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials!" })

            const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            const refreshToken = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.REFRESH_TOKEN_SECRET)

            const refreshCreated = await TokenModel.create({ refreshToken })
            res.status(200).json({ user: existingUser, token, refreshToken: refreshCreated?.refreshToken })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    signUp = async (req, res) => {
        try {
            const { firstName, lastName, email, password, image } = req.body

            const existingUser = await UserModel.findOne({ email })

            if (existingUser) return res.status(404).json({ message: "User already exist!", user: existingUser })

            if (password !== password) return res.status(404).json({ message: "Password don't match!" })

            const hashedPassword = await bcrypt.hash(password, 12)

            const userCreated = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}`, image })
            const token = jwt.sign({ email: userCreated.email, id: userCreated._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })

            res.status(200).json({ user: userCreated, token })

        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    refreshToken = async (req, res) => {
        try {
            const refreshToken = req.body.refreshToken

            if (!refreshToken) return res.status(401).json({
                message: 'Lỗi bảo mật'
            })

            let refreshTokensModel = await TokenModel.find({})

            const refreshTokens = refreshTokensModel.map((item) => item.refreshToken)


            if (!refreshTokens.includes(refreshToken)) return res.status(403).json({ message: 'Không có quyền truy cập' })

            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, function (err, decoded) {
                if (err) return res.status(403).json({ message: 'Không có quyền truy cập' })

                const newToken = jwt.sign({ email: decoded?.email, id: decoded?.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
                const newRefreshToken = jwt.sign({ email: decoded?.email, id: decoded?.id }, process.env.REFRESH_TOKEN_SECRET)

                const createNewRefreshToken = async () => {
                    const refreshTokenDeleted = await TokenModel.findOneAndDelete({ refreshToken })
                    const refreshCreated = await TokenModel.create({ refreshToken: newRefreshToken })
                }

                createNewRefreshToken()
                res.status(200).json({ token: newToken, refreshToken: newRefreshToken })
            });
        } catch (error) {
            console.log(error)
        }
    }

    logout = async (req, res) => {
        try {
            const { refreshToken } = req.body

            if (!refreshToken) return res.status(200).json({ message: 'Đã đăng xuất thành công' })
            const refreshTokenDeleted = await TokenModel.findOneAndDelete({ refreshToken })
            res.json(refreshTokenDeleted)
        } catch (error) {
            res.status(409).json({ message: error.message })
        }
    }
}

const userController = new UserController

export default userController
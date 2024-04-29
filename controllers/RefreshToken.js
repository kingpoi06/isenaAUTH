import Users from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) return res.sendStatus(401);
        
        // Cari user berdasarkan refreshToken
        const user = await Users.findOne({
            where: {
                jwt_token: refreshToken
            }
        });

        if (!user) return res.sendStatus(403);

        // Verifikasi refreshToken
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    // Token kedaluwarsa, kirim status 401 Unauthorized
                    return res.sendStatus(401);
                } else {
                    // Token tidak valid, kirim status 403 Forbidden
                    return res.sendStatus(403);
                }
            }
            
            // Jika verifikasi berhasil, buat accessToken baru
            const { id, uuid, username, email, role } = user;
            const accessToken = jwt.sign({ id, uuid, username, email, role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15s'
            });

            // Kirim accessToken sebagai respons
            res.json({ accessToken });
        });
    } catch (error) {
        console.error(error);
        res.sendStatus(500); // Internal Server Error
    }
};

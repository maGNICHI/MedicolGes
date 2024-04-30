const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const jwt = require("jsonwebtoken");
const generateToken = require("../../generateToken");

const enable2FA = async (req, res) => {
    try {
      const { userId } = req.body;
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
      const secret = speakeasy.generateSecret({ length: 20 });
      user.twoFactorAuth = { secret: secret.base32, enabled: false };
      await user.save();
      qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
        if (err) {
          throw err;
        }
        res.json({ qrcode: data_url });
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  const verify2FA = async (req, res) => {
    try {
        const { userId, token } = req.body;
        const user = await User.findById(userId);
    
        if (!user) {
            return res.status(400).json({ success: false, message: 'User not found.' });
        }
    
        if (!user.twoFactorAuth || !user.twoFactorAuth.secret) {
            return res.status(400).json({ success: false, message: '2FA is not set up.' });
        }
    
        const isVerified = speakeasy.totp.verify({
            secret: user.twoFactorAuth.secret,
            encoding: 'base32',
            token: token
        });
    
        if (isVerified) {
            user.twoFactorAuth.enabled = true;
            await user.save();

            // Ensure you're generating a token here
            const token = generateToken(user);
    
            return res.json({
                success: true,
                twoFactorEnabled: true,
                user: {
                    _id: user._id,
                    gender: user.gender,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    role: user.role,
                    isAdmin: user.isAdmin,
                    pic: user.pic,
                    certification: user.certification,
                    isDeleted: user.isDeleted,
                    token: token
                }
            });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid 2FA token' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};


  module.exports = {   verify2FA,enable2FA};
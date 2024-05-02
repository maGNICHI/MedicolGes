const speakeasy = require('speakeasy');
const qrcode = require('qrcode');
const jwt = require("jsonwebtoken");
const generateToken = require("../../generateToken");

const nodemailer = require('nodemailer');
// const enable2FA = async (req, res) => {
//     try {
//       const { userId } = req.body;
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(404).json({ success: false, message: 'User not found.' });
//       }
//       const secret = speakeasy.generateSecret({ length: 20 });
//       user.twoFactorAuth = { secret: secret.base32, enabled: false };
//       await user.save();
//       qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
//         if (err) {
//           throw err;
//         }
//         res.json({ qrcode: data_url });
//       });
//     } catch (error) {
//       res.status(500).json({ success: false, message: error.message });
//     }
//   };


  
//   const verify2FA = async (req, res) => {
//     try {
//         const { userId, token } = req.body;
//         const user = await User.findById(userId);
    
//         if (!user) {
//             return res.status(400).json({ success: false, message: 'User not found.' });
//         }
    
//         if (!user.twoFactorAuth || !user.twoFactorAuth.secret) {
//             return res.status(400).json({ success: false, message: '2FA is not set up.' });
//         }
    
//         const isVerified = speakeasy.totp.verify({
//             secret: user.twoFactorAuth.secret,
//             encoding: 'base32',
//             token: token
//         });
    
//         if (isVerified) {
//             user.twoFactorAuth.enabled = true;
//             await user.save();

//             // Ensure you're generating a token here
//             const token = generateToken(user);
    
//             return res.json({
//                 success: true,
//                 twoFactorEnabled: true,
//                 user: {
//                     _id: user._id,
//                     gender: user.gender,
//                     username: user.username,
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                     email: user.email,
//                     role: user.role,
//                     isAdmin: user.isAdmin,
//                     pic: user.pic,
//                     certification: user.certification,
//                     isDeleted: user.isDeleted,
//                     token: token
//                 }
//             });
//         } else {
//             return res.status(400).json({ success: false, message: 'Invalid 2FA token' });
//         }
//     } catch (error) {
//         return res.status(500).json({ success: false, message: error.message });
//     }
// };
const enable2FA = async (req, res) => {
    console.log("enable2FA called", new Date());

    try {
      const { user_id } = req.body;
      const user = await User.findById(user_id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found.' });
      }
  
      // Generate a secret key for the user
      const secret = speakeasy.generateSecret({ length: 20 });
      user.twoFactorAuth = { secret: secret.base32, enabled: false };
      await user.save();
  
      // Generate QR code URL
      const otpauthUrl = secret.otpauth_url;
  
      // Generate QR code image
      qrcode.toDataURL(otpauthUrl, async (err, data_url) => {
        if (err) {
          console.log('Error generating QR code:', err);
          return res.status(500).json({ success: false, message: 'Error generating QR code.' });
        }
  
        // Send email with QR code
        const transporter = nodemailer.createTransport({
          service: 'outlook',
          auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
          },
        });
  
        // Attach the QR code as an inline image
        const mailOptions = {
          from: 'linkuptournament@outlook.com',
          to: user.email,
          subject: 'Two-Factor Authentication Setup',
          html: `<p>Scan the QR code below to set up two-factor authentication:</p><img src="cid:qr-code">`,
          attachments: [{
            filename: 'qr-code.png',
            path: data_url,
            cid: 'qr-code' // same CID as referenced in the html img src
          }]
        };
  
        transporter.sendMail(mailOptions, function(error, info) {
          if (error) {
            console.log('Error sending email:', error);
            return res.status(500).send('Error sending email.');
          } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ success: true, message: 'QR code sent to your email.' });
          }
        });
      });
    } catch (error) {
      console.log("Server Error:", error);
      res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
  };
  
  
  
  const verify2FA = async (req, res) => {
    try {
        const { user_id, token } = req.body;
        const user = await User.findById(user_id);
    
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
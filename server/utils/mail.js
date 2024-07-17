import nodemailer from "nodemailer";
import {
  SMTP_HOST,
  SMTP_MAIL,
  SMTP_PASSWORD,
  SMTP_PORT,
} from "../config/envConfig.js";

// OTP generator
export const generateOTP = () => {
  let otp = "";
  for (let i = 0; i <= 3; i++) {
    const randomValue = Math.round(Math.random() * 9);
    otp += randomValue;
  }
  return otp;
};

// Nodemailer transporter
export const mailTransport = () => {
  let transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT, // Typically 587 for TLS, 465 for SSL
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: SMTP_MAIL,
      pass: SMTP_PASSWORD,
    },
  });
  return transporter;
};

// OTP email template
export const generateOTPEmailTemplate = (code) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your OTP Code</title>
        </head>
        <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <div style="text-align: center; border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px;">
              <h2 style="margin: 0; color: #333;">Your OTP Code</h2>
            </div>
            <div style="font-size: 16px; color: #333;">
              <p>Hello,</p>
              <p>Your One-Time Password (OTP) is:</p>
              <p style="text-align: center; font-size: 24px; color: #000; font-weight: bold; margin: 20px 0;">${code}</p>
              <p>If you did not request this OTP, please ignore this email.</p>
            </div>
            <div style="font-size: 16px; color: #333; margin-top: 20px; text-align: center; border-top: 1px solid #ddd; padding-top: 10px;">
              <p>Best regards,<br>Shibaji Sangha Team.</p>
            </div>
          </div>
        </body>
      </html>
  `;
};

// General Email template
export const plainEmailTemplate = (heading, message) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; background-color: #fff;">
      <h1 style="font-size: 24px; color: #333; text-align: center; margin-bottom: 20px;">${heading}</h1>
      <p style="margin-bottom: 20px;">${message}</p>
      <p style="margin-bottom: 20px;">If you have any questions or need further assistance, please feel free to <a href="mailto:subhamrakshit667@gmail.com" style="color: #007bff; text-decoration: underline;">contact our support team</a>.</p>
      <p>Best regards,<br> Shibaji Sangha Team.</p>
    </div>
    </body>
    </html>
  `;
};

// Reset token email tamplate
export const resetTokenEmailTemplate = (url) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="color: #333;">Password Reset</h2>
          <p>You have requested to reset your password. Please click the link below to reset your password:</p>
          <p style="margin-bottom: 20px;"><a href="${url}" style="background-color: #007bff; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 4px;">Click Here</a></p>
          <p>This link will expire in one hour.</p>
          <p>If you did not request a password reset, please ignore this email.</p>
          <p>Thank you!</p>
      </div>
    </body>
    </html>
  `;
};

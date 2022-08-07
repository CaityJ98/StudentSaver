// const TABLE_NAME = 'StudentSaver';
const config = {
  PORT: process.env.PORT || 'https://student-saver-server.herokuapp.com/',

  DB_CONNECTION: `mongodb://localhost:27017/student-services`,
  SECRET: "secret123",
  SALT: 10,
  COOKIE_NAME: "USER_SESSION",
  CLOUDINARY_NAME: "dmpf1ttrq",
  CLOUDINARY_API_KEY: 194462863141282,
  CLOUDINARY_API_SECRET: "6dhQYk87FVj-JMMHoeKiw7d1FlQ",
  CLOUDINARY_STORAGE:
    "CLOUDINARY_URL=cloudinary://194462863141282:6dhQYk87FVj-JMMHoeKiw7d1FlQ@dmpf1ttrq"
};
module.exports = config;

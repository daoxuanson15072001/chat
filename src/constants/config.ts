require('dotenv').config();

export const config = {
  MYSQL: {
    HOST: process.env.MYSQL_HOST,
    PORT: Number(process.env.MYSQL_PORT) || 3306,
    USER: process.env.MYSQL_USER,
    PASSWORD: process.env.MYSQL_PASS,
    DB_NAME: process.env.MYSQL_DB_NAME,
  },
};

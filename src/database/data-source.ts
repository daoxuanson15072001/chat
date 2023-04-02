import { DataSource, DataSourceOptions } from 'typeorm';

import { DefaultEntities } from './entities';
import { DefaultMigrations } from './migrations';
import { config } from 'src/constants/config';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: config.MYSQL.HOST,
  port: config.MYSQL.PORT,
  username: config.MYSQL.USER,
  password: config.MYSQL.PASSWORD,
  database: config.MYSQL.DB_NAME,
  synchronize: false,
  entities: [...DefaultEntities],
  migrations: [...DefaultMigrations],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

import { DataSource, DataSourceOptions } from 'typeorm';
import { DefaultEntities } from './entities';
import { DefaultMigrations } from './migrations';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Amela@123a@',
  database: 'chat',
  synchronize: false,
  entities: [...DefaultEntities],
  migrations: [...DefaultMigrations],
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;

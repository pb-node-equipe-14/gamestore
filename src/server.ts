import app from './app';
import AppDataSource from './data-source';
import 'dotenv/config';

(async () => {
  await AppDataSource.initialize().catch(err => {
    console.error('Error during Data Source initialization', err);
  });

  app.listen(4000, () => {
    console.log('Servidor executando na porta 4000');
  });
})();

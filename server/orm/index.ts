import { createConnection } from 'typeorm';

export async function connect() {
  const connection = await createConnection();

  return connection;
}

export async function getRepos() {}

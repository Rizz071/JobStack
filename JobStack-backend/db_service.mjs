// import { query } from './db/index';

// const createTableJobs = async () => {
//   try {
//     await query(`
// CREATE TABLE IF NOT EXISTS "test_jobs_data" (
//     "id" SERIAL PRIMARY KEY,
//     "user_id" INTEGER REFERENCES users ("id"),
//     "job_title" TEXT,
//     "job_desc" TEXT NOT NULL,
//     "date_of_apply" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     "current_status_desc" TEXT,
//     "active" BOOLEAN NOT NULL DEFAULT true
// );`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const createTableUsers = async () => {
//   try {
//     await query(`
//         CREATE TABLE IF NOT EXISTS "test_users" (
//             "id" SERIAL PRIMARY KEY,
//             "username" TEXT NOT NULL,
//             "password" TEXT NOT NULL,
//             "fullname" TEXT,
//             "is_admin" BOOLEAN NOT NULL DEFAULT false,
//             "date_of_reg" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//         );`);
//   } catch (error) {
//     console.log(error);
//   }
// };

// // const execQuery = async (query: string) => {
// //   try {
// //     const result = await db.query(query);
// //     console.log(result);
// //   } catch (error) {
// //     console.log(error);
// //   }
// // };

// // execQuery('DROP TABLE jobs_data CASCADE')
// // execQuery('DROP TABLE users CASCADE')
// await createTableUsers();
// // await createTableJobs();
// // execQuery('DROP TABLE users CASCADE')
// // execQuery('SELECT * FROM jobs_data')
// // execQuery(`DELETE FROM users WHERE id=3;`)

// // execQuery(`INSERT INTO users (username, password, fullname) VALUES ('testuser', '11111', 'Esi Merkki') RETURNING *;`)
// // execQuery(`INSERT INTO jobs_data (user_id, job_title, job_desc) VALUES (4, 'Test job title', 'Test description of job') RETURNING *;`)
// // execQuery(``);

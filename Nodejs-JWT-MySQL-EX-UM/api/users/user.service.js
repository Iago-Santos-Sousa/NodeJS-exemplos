const pool = require("../../config/database");

module.exports = {
  create: (data, callback) => {
    // console.log(data);

    pool.query(
      `INSERT INTO registration (firstName, lastName, gender, email, password, number) VALUES(?,?,?,?,?,?)`,
      [
        data.firstName,
        data.lastName,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getUsers: (callback) => {
    pool.query(
      `SELECT id,firstName,lastName,gender,email,number FROM registration`,
      [],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  getUserByUserEmail: (email, callBack) => {
    pool.query(
      `SELECT * FROM registration WHERE email = ?`,
      [email],
      (error, results, fields) => {
        if (error) {
          callBack(error);
        }
        return callBack(null, results[0]);
      },
    );
  },

  getUserByUserId: (id, callback) => {
    pool.query(
      `SELECT id,firstName,lastName,gender,email,number FROM registration WHERE id = ?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      },
    );
  },

  updateUser: (data, callback) => {
    // console.log(data);

    pool.query(
      `UPDATE registration SET firstName=?, lastName=?, gender=?, email=?, password=?, number=? WHERE id = ?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id,
      ],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results);
      },
    );
  },

  deleteUser: (data, callback) => {
    pool.query(
      `DELETE FROM registration WHERE id = ?`,
      [data.id],
      (error, results, fields) => {
        if (error) {
          return callback(error);
        }
        return callback(null, results[0]);
      },
    );
  },
};

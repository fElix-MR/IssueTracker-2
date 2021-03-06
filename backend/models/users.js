const db = require('../db');

exports.create = async ({ id, profileImageUrl, password }) => {
  try {
    const connection = await db.pool.getConnection(async conn => conn);
    let sql =
      'INSERT INTO users (nickname, profile_image_url, password) VALUES (?, ?, ?)';
    const [{ insertId }] = await connection.query(sql, [
      id,
      profileImageUrl,
      password,
    ]);
    connection.release();
    return insertId;
  } catch (err) {
    throw new Error(err);
  }
};

exports.findOne = async ({ username }) => {
  try {
    const connection = await db.pool.getConnection(async conn => conn);
    let sql = `SELECT * FROM users WHERE nickname=?`;
    const [[userInfo]] = await connection.query(sql, [username]);
    connection.release();
    return userInfo;
  } catch (err) {
    throw new Error(err);
  }
};

exports.getAll = async () => {
  try {
    const connection = await db.pool.getConnection(async conn => conn);
    let sql = `SELECT * FROM users `;

    const userList = await connection.query(sql);
    connection.release();
    return userList[0];
  } catch (err) {
    throw new Error(err);
  }
};

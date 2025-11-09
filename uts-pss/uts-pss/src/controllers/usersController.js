const pool = require('../db');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
    res.render('users/list', { items: rows });
  } catch (err) { next(err); }
};

exports.newForm = (req, res) => {
  res.render('users/form', { item: {}, action: 'create' });
};

exports.create = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    await pool.execute(
      'INSERT INTO users (name, email, role) VALUES (?, ?, ?)',
      [name, email, role]
    );
    res.redirect('/users');
  } catch (err) { next(err); }
};

exports.editForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);
    if (!rows[0]) return res.status(404).send('User tidak ditemukan');
    res.render('users/form', { item: rows[0], action: 'update' });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, role } = req.body;
    await pool.execute(
      'UPDATE users SET name=?, email=?, role=? WHERE id=?',
      [name, email, role, id]
    );
    res.redirect('/users');
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM users WHERE id = ?', [id]);
    res.redirect('/users');
  } catch (err) { next(err); }
};

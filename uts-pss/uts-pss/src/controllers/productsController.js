const pool = require('../db');

exports.list = async (req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.render('products/list', { items: rows });
  } catch (err) { next(err); }
};

exports.newForm = (req, res) => {
  res.render('products/form', { item: {}, action: 'create' });
};

exports.create = async (req, res, next) => {
  try {
    const { name, sku, price, stock } = req.body;
    await pool.execute(
      'INSERT INTO products (name, sku, price, stock) VALUES (?, ?, ?, ?)',
      [name, sku, price, stock]
    );
    res.redirect('/products');
  } catch (err) { next(err); }
};

exports.editForm = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.execute('SELECT * FROM products WHERE id = ?', [id]);
    if (!rows[0]) return res.status(404).send('Produk tidak ditemukan');
    res.render('products/form', { item: rows[0], action: 'update' });
  } catch (err) { next(err); }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, sku, price, stock } = req.body;
    await pool.execute(
      'UPDATE products SET name=?, sku=?, price=?, stock=? WHERE id=?',
      [name, sku, price, stock, id]
    );
    res.redirect('/products');
  } catch (err) { next(err); }
};

exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    res.redirect('/products');
  } catch (err) { next(err); }
};

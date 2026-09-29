import pool from '../config/database';
import { Product, ProductFilters, CreateProductDTO } from '../types/product';

export async function findAll(filters: ProductFilters = {}): Promise<Product[]> {
  let query = 'SELECT * FROM products WHERE 1=1';
  const values: unknown[] = [];

  if (filters.name) {
    values.push(`%${filters.name}%`);
    query += ` AND name ILIKE $${values.length}`;
  }
  if (filters.status !== undefined) {
    values.push(filters.status);
    query += ` AND status = $${values.length}`;
  }

  query += ' ORDER BY id';
  const result = await pool.query(query, values);
  return result.rows;
}

export async function findById(id: number): Promise<Product | undefined> {
  const result = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return result.rows[0];
}

export async function create(data: CreateProductDTO): Promise<Product> {
  const { name, description, price, quantity, status } = data;
  const result = await pool.query(
    `INSERT INTO products (name, description, price, quantity, status)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [name, description, price, quantity, status]
  );
  return result.rows[0];
}

export async function update(id: number, data: CreateProductDTO): Promise<Product> {
  const { name, description, price, quantity, status } = data;
  const result = await pool.query(
    `UPDATE products SET name=$1, description=$2, price=$3, quantity=$4, status=$5, updated_at=NOW()
     WHERE id=$6 RETURNING *`,
    [name, description, price, quantity, status, id]
  );
  return result.rows[0];
}

export async function patch(id: number, fields: Partial<CreateProductDTO>): Promise<Product> {
  const keys = Object.keys(fields) as (keyof CreateProductDTO)[];
  const sets = keys.map((k, i) => `${k} = $${i + 1}`).join(', ');
  const values = [...keys.map(k => fields[k]), id];

  const result = await pool.query(
    `UPDATE products SET ${sets}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
    values
  );
  return result.rows[0];
}

export async function remove(id: number): Promise<void> {
  await pool.query('DELETE FROM products WHERE id = $1', [id]);
}

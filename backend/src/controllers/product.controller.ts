import { Request, Response } from 'express';
import * as productService from '../services/product.service';

export async function index(req: Request, res: Response): Promise<void> {
  const { name, status } = req.query;
  const filters: { name?: string; status?: boolean } = {};
  if (name) filters.name = String(name);
  if (status !== undefined) filters.status = status === 'true';

  const products = await productService.listProducts(filters);
  res.json(products);
}

export async function show(req: Request, res: Response): Promise<void> {
  const product = await productService.getProduct(Number(req.params.id));
  res.json(product);
}

export async function store(req: Request, res: Response): Promise<void> {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
}

export async function update(req: Request, res: Response): Promise<void> {
  const product = await productService.updateProduct(Number(req.params.id), req.body);
  res.json(product);
}

export async function patch(req: Request, res: Response): Promise<void> {
  const product = await productService.patchProduct(Number(req.params.id), req.body);
  res.json(product);
}

export async function destroy(req: Request, res: Response): Promise<void> {
  await productService.deleteProduct(Number(req.params.id));
  res.status(204).send();
}

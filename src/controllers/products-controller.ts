import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { knex } from "@/database/knex";

class ProductController {
  async index(request: Request, response: Response, next: NextFunction) {
    const { name } = request.query;
    try {
      const products = await knex<ProductTable>("products")
        .select()
        .whereLike("name", `%${name ?? ""}%`)
        .orderBy("name");

      return response.json({ products });
    } catch (error) {
      next(error);
    }
  }

  async create(request: Request, response: Response, next: NextFunction) {
    try {
      const bodySchema = z.object({
        name: z.string().trim().min(1),
        price: z.number().gt(0),
      });

      const { name, price } = bodySchema.parse(request.body);
      await knex<ProductTable>("products").insert({ name, price });

      return response.status(201).json();
    } catch (error) {
      next(error);
    }
  }
}

export { ProductController };

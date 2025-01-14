import { NextFunction, Request, Response } from "express";
import ProductRepository from "../../repositories/product/product.repository";
import ApiError from "../../infra/apiErrors/ApiError";
export default class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductRepository.findAll();
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async getByCategory(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const products = await ProductRepository.findByCategory(
        req.params.category,
      );
      return res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = req.body;
      const product = await ProductRepository.create({
        name: data.name,
        description: data.description,
        price: data.price,
        categories: data.category,
        inventory: data.inventory,
      });
      return res.status(201).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductRepository.update(req.body);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    try {
      const product = await ProductRepository.delete(id);
      return res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  static async newImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const imagesPaths = (req.files as Array<Express.Multer.File>)?.map((
        image,
      ) => image.path);
      const image = await ProductRepository.newImage(id, imagesPaths);
      return res.status(201).json(image);
    } catch (error) {
      next(error);
    }
  }

  static async deleteImage(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.id);
      const image = await ProductRepository.deleteImage(id);
      return res.status(200).json(image);
    } catch (error) {
      next(error);
    }
  }
}

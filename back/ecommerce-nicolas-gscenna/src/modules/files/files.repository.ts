import { Injectable } from "@nestjs/common";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { Readable } from "stream";

import { ProductsRepository } from "../products/products.repository";

@Injectable()
export class FilesRepository {
    constructor(
        private readonly productsRepository: ProductsRepository,
    ) {}

    async uploadImage(
        id: string,
        file: Express.Multer.File,
    ): Promise<UploadApiResponse> {
        return new Promise<UploadApiResponse>((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream(
                { resource_type: "auto" },
                async (error, result) => {
                    if (error) {
                        return reject(error);
                    }

                    if (!result) {
                        return reject(
                            new Error("Cloudinary no devolvió un resultado"),
                        );
                    }

                    await this.productsRepository.updateProduct(id, {
                        imgUrl: result.secure_url,
                    });

                    resolve(result);
                },
            );

            Readable.from(file.buffer).pipe(upload);
        });
    }
}
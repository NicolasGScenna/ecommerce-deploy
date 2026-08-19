import { Injectable } from "@nestjs/common";
import { IProduct } from "./interfaces/product.interface";

@Injectable()
export class ProductsRepository {
    private products: IProduct[] = [
        {
            id: 1,
            name: "Notebook Lenovo IdeaPad 3",
            description: "Notebook con procesador Intel Core i5, 8 GB de RAM y 256 GB SSD.",
            price: 899999,
            stock: true,
            imgUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
        },
        {
            id: 2,
            name: "Smartphone Samsung Galaxy A54",
            description: "Teléfono inteligente con pantalla AMOLED de 6.4 pulgadas y cámara de 50 MP.",
            price: 649999,
            stock: true,
            imgUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        },
        {
            id: 3,
            name: "Auriculares Sony WH-1000XM5",
            description: "Auriculares inalámbricos con cancelación activa de ruido.",
            price: 329999,
            stock: true,
            imgUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
        },
        {
            id: 4,
            name: "Cafetera Oster PrimaLatte",
            description: "Cafetera espresso automática con espumador de leche.",
            price: 279999,
            stock: true,
            imgUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
        },
        {
            id: 5,
            name: "Zapatillas Adidas Runfalcon",
            description: "Zapatillas deportivas livianas para running y uso diario.",
            price: 119999,
            stock: true,
            imgUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        },
        {
            id: 6,
            name: "Mochila urbana Samsonite",
            description: "Mochila resistente con compartimento para notebook de hasta 15 pulgadas.",
            price: 84999,
            stock: true,
            imgUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
        },
        {
            id: 7,
            name: "Set de sábanas de algodón",
            description: "Juego de sábanas de algodón de 2 plazas, suave y confortable.",
            price: 59999,
            stock: true,
            imgUrl: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304",
        },
        {
            id: 8,
            name: "Mancuernas ajustables",
            description: "Par de mancuernas ajustables para entrenamiento en casa.",
            price: 74999,
            stock: true,
            imgUrl: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61",
        },
    ];

    getProducts(): IProduct[] {
        return this.products;
    }
}
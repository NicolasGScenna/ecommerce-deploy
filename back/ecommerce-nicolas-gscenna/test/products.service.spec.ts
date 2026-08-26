import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../src/modules/products/products.service';
import { ProductsRepository } from '../src/modules/products/products.repository';
import { CategoriesRepository } from '../src/modules/categories/categories.repository';

describe('ProductsService', () => {
  let productsService: ProductsService;

  const mockProductsRepository = {
    getProducts: jest.fn(),
    getById: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
    addProducts: jest.fn(),
  };

  const mockCategoriesRepository = {
    getCategories: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: ProductsRepository,
          useValue: mockProductsRepository,
        },
        {
          provide: CategoriesRepository,
          useValue: mockCategoriesRepository,
        },
      ],
    }).compile();

    productsService = module.get<ProductsService>(ProductsService);

    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(productsService).toBeDefined();
  });

  it('debería devolver una lista de productos', async () => {
    const products = [
      {
        id: '123',
        name: 'Iphone 15',
        description: 'Smartphone',
        price: 199.99,
        stock: 12,
      },
    ];

    mockProductsRepository.getProducts.mockResolvedValue(products);

    const result = await productsService.getProducts(1, 5);

    expect(result).toEqual(products);

    expect(mockProductsRepository.getProducts)
      .toHaveBeenCalledWith(1, 5);
  });

  it('debería devolver un producto por ID', async () => {
    const product = {
      id: '123',
      name: 'Iphone 15',
      description: 'Smartphone',
      price: 199.99,
      stock: 12,
    };

    mockProductsRepository.getById.mockResolvedValue(product);

    const result = await productsService.getProductById('123');

    expect(result).toEqual(product);

    expect(mockProductsRepository.getById)
      .toHaveBeenCalledWith('123');
  });

  it('debería actualizar un producto', async () => {
    mockProductsRepository.updateProduct.mockResolvedValue(
      'Producto actualizado correctamente',
    );

    const product = {
      name: 'Iphone 15 Pro',
      price: 299.99,
      stock: 10,
    };

    const result = await productsService.updateProduct(
      '123',
      product,
    );

    expect(result).toBe('Producto actualizado correctamente');

    expect(mockProductsRepository.updateProduct)
      .toHaveBeenCalledWith('123', product);
  });
});
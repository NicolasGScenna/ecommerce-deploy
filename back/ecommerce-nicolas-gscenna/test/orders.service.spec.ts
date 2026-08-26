import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../src/modules/orders/orders.service';
import { OrdersRepository } from '../src/modules/orders/orders.repository';

describe('OrdersService', () => {
  let ordersService: OrdersService;

  const mockOrdersRepository = {
    getOrder: jest.fn(),
    addOrder: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: OrdersRepository,
          useValue: mockOrdersRepository,
        },
      ],
    }).compile();

    ordersService = module.get<OrdersService>(OrdersService);

    jest.clearAllMocks();
  });

  it('debería estar definido', () => {
    expect(ordersService).toBeDefined();
  });

  it('debería devolver una orden por ID', async () => {
    const order = {
      id: 'order-123',
      date: new Date(),
    };

    mockOrdersRepository.getOrder.mockResolvedValue(order);

    const result = await ordersService.getOrder('order-123');

    expect(result).toEqual(order);

    expect(mockOrdersRepository.getOrder)
      .toHaveBeenCalledWith('order-123');
  });

  it('debería crear una orden', async () => {
    const orderDto = {
      userId: 'user-123',
      products: [
        {
          id: 'product-123',
        },
      ],
    };

    const createdOrder = {
      id: 'order-123',
    };

    mockOrdersRepository.addOrder.mockResolvedValue(createdOrder);

    const result = await ordersService.addOrder(orderDto);

    expect(result).toEqual(createdOrder);

    expect(mockOrdersRepository.addOrder)
      .toHaveBeenCalledWith(orderDto);
  });
});
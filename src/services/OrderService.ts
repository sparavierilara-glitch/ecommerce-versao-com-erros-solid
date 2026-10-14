
import { IOrderRepository } from '../repositories/IOrderRepository';
import { NotificationService } from './NotificationService';

export class OrderService {
  constructor(
    private orderRepository: IOrderRepository,
    private notificationService: NotificationService
  ) {}

  async saveOrder(
    customer: string,
    productsDetails: any[],
    totalAmount: number
  ) {
    const order = await this.orderRepository.create({
      customer,
      items: JSON.stringify(productsDetails),
      total: totalAmount,
      status: 'confirmed'
    });

    const email = await this.notificationService.sendOrderConfirmation(
      customer,
      order.id,
      totalAmount,
      productsDetails
    );

    return {
      order,
      emailPreview: email.previewUrl
    };
  }
}

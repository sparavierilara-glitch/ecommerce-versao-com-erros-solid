
export interface IPaymentMethod {
  process(paymentDetails: any): Promise<void>;


  const payment = this.getPaymentMethod(paymentMethod);
await payment.process(paymentDetails);
}
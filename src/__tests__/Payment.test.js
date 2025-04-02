import { Payment } from '../models/Payment.js';

describe('Payment', () => {
  let payment;

  beforeEach(() => {
    payment = new Payment();
  });

  test('should initialize with empty payment history', () => {
    expect(payment.paymentHistory).toEqual([]);
  });

  test('should process payment successfully', () => {
    const paymentDetails = {
      amount: 10,
      method: 'credit_card',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123'
    };
    const result = payment.processPayment(paymentDetails);
    expect(result.success).toBe(true);
    expect(payment.paymentHistory).toHaveLength(1);
    expect(payment.paymentHistory[0].amount).toBe(10);
  });

  test('should validate payment details', () => {
    const validPayment = {
      amount: 10,
      method: 'credit_card',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123'
    };
    const invalidPayment = {
      amount: -10,
      method: 'credit_card',
      cardNumber: '123',
      expiryDate: '12/25',
      cvv: '123'
    };

    expect(payment.validatePaymentDetails(validPayment)).toBe(true);
    expect(payment.validatePaymentDetails(invalidPayment)).toBe(false);
  });

  test('should generate payment receipt', () => {
    const paymentDetails = {
      amount: 10,
      method: 'credit_card',
      cardNumber: '4111111111111111',
      expiryDate: '12/25',
      cvv: '123'
    };
    payment.processPayment(paymentDetails);
    const receipt = payment.generateReceipt(payment.paymentHistory[0].id);
    expect(receipt).toBeDefined();
    expect(receipt.amount).toBe(10);
    expect(receipt.timestamp).toBeDefined();
  });
}); 
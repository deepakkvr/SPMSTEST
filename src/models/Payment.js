export class Payment {
  constructor(id, userId, amount, status = 'pending') {
    this.id = id;
    this.userId = userId;
    this.amount = amount;
    this.status = status;
    this.timestamp = new Date();
    this.paymentHistory = [];
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new Payment(
      doc.id,
      data.userId,
      data.amount,
      data.status
    );
  }

  toFirestore() {
    return {
      userId: this.userId,
      amount: this.amount,
      status: this.status,
      timestamp: this.timestamp
    };
  }

  processPayment(paymentDetails) {
    if (this.validatePaymentDetails(paymentDetails)) {
      const paymentRecord = {
        id: Date.now().toString(),
        amount: this.amount,
        timestamp: new Date(),
        status: 'completed',
        ...paymentDetails
      };
      this.paymentHistory.push(paymentRecord);
      this.status = 'completed';
      return { success: true, paymentRecord };
    }
    return { success: false, error: 'Invalid payment details' };
  }

  validatePaymentDetails(details) {
    return (
      details &&
      details.cardNumber &&
      details.expiryDate &&
      details.cvv &&
      details.cardNumber.length >= 16 &&
      details.cvv.length >= 3
    );
  }

  generateReceipt(paymentId) {
    const payment = this.paymentHistory.find(p => p.id === paymentId);
    if (!payment) return null;

    return {
      id: payment.id,
      amount: payment.amount,
      timestamp: payment.timestamp,
      status: payment.status,
      cardNumber: payment.cardNumber.slice(-4)
    };
  }
} 
export class Vehicle {
  constructor(id, licensePlate, make, model, color) {
    this.id = id;
    this.licensePlate = licensePlate;
    this.make = make;
    this.model = model;
    this.color = color;
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new Vehicle(
      doc.id,
      data.licensePlate,
      data.make,
      data.model,
      data.color
    );
  }

  toFirestore() {
    return {
      licensePlate: this.licensePlate,
      make: this.make,
      model: this.model,
      color: this.color
    };
  }

  static validateLicensePlate(plate) {
    // Basic validation: at least 6 characters
    return plate && plate.length >= 6;
  }

  getDetails() {
    return {
      licensePlate: this.licensePlate,
      make: this.make,
      model: this.model,
      color: this.color
    };
  }

  updateDetails(details) {
    Object.assign(this, details);
  }
} 
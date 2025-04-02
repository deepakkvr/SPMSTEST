export class User {
  constructor(id, name, email, phoneNumber = '') {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.vehicle = null;
    this.parkingHistory = [];
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new User(doc.id, data.name, data.email, data.phoneNumber);
  }

  toFirestore() {
    return {
      name: this.name,
      email: this.email,
      phoneNumber: this.phoneNumber
    };
  }

  registerVehicle(vehicle) {
    this.vehicle = vehicle;
  }

  addParkingHistory(parkingRecord) {
    this.parkingHistory.push(parkingRecord);
  }

  getParkingHistory() {
    return this.parkingHistory;
  }
} 
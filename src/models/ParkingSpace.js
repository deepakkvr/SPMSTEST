class ParkingSpace {
  constructor(id, number, isOccupied = false) {
    this.id = id;
    this.number = number;
    this.isOccupied = isOccupied;
    this.vehicle = null;
    this.entryTime = null;
  }

  static fromFirestore(doc) {
    const data = doc.data();
    return new ParkingSpace(
      doc.id,
      data.number,
      data.isOccupied
    );
  }

  toFirestore() {
    return {
      number: this.number,
      isOccupied: this.isOccupied,
      vehicle: this.vehicle,
      entryTime: this.entryTime
    };
  }

  occupy(vehicle) {
    this.isOccupied = true;
    this.vehicle = vehicle;
    this.entryTime = new Date();
  }

  vacate() {
    this.isOccupied = false;
    this.vehicle = null;
    this.entryTime = null;
  }

  calculateParkingDuration() {
    if (!this.entryTime) return 0;
    const now = new Date();
    return (now - this.entryTime) / (1000 * 60 * 60); // Duration in hours
  }
}

export default ParkingSpace; 
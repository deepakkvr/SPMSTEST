class ParkingManagementSystem {
  constructor() {
    this.parkingLots = [];
    this.users = [];
    this.vehicles = [];
    this.payments = [];
  }

  addParkingLot(lot) {
    this.parkingLots.push(lot);
  }

  addUser(user) {
    this.users.push(user);
  }

  addVehicle(vehicle) {
    this.vehicles.push(vehicle);
  }

  addPayment(payment) {
    this.payments.push(payment);
  }

  getParkingLot(id) {
    return this.parkingLots.find(lot => lot.id === id);
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  getVehicle(id) {
    return this.vehicles.find(vehicle => vehicle.id === id);
  }

  getPayment(id) {
    return this.payments.find(payment => payment.id === id);
  }

  getAvailableParkingLots() {
    return this.parkingLots.filter(lot => lot.availableSpots > 0);
  }

  findAvailableParkingLot() {
    const availableLots = this.parkingLots.filter(lot => lot.availableSpaces > 0);
    return availableLots.length > 0 ? availableLots[0] : null;
  }

  updateParkingLotAvailability(lotId, availableSpaces) {
    const lot = this.getParkingLot(lotId);
    if (lot) {
      lot.availableSpaces = availableSpaces;
    }
  }
}

export default ParkingManagementSystem; 
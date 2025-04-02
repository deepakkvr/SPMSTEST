import ParkingManagementSystem from '../models/ParkingManagementSystem';
import { ParkingLot } from '../models/ParkingLot';

describe('ParkingManagementSystem', () => {
  let parkingSystem;

  beforeEach(() => {
    parkingSystem = new ParkingManagementSystem();
  });

  test('should initialize with empty arrays', () => {
    expect(parkingSystem.parkingLots).toEqual([]);
    expect(parkingSystem.users).toEqual([]);
    expect(parkingSystem.vehicles).toEqual([]);
    expect(parkingSystem.payments).toEqual([]);
  });

  test('should add and get parking lot', () => {
    const lot = new ParkingLot('1', 'Test Lot', 100, 'Test Location');
    parkingSystem.addParkingLot(lot);
    expect(parkingSystem.parkingLots).toHaveLength(1);
    expect(parkingSystem.getParkingLot('1')).toEqual(lot);
  });

  test('should add and get user', () => {
    const user = { id: '1', name: 'Test User', email: 'test@example.com' };
    parkingSystem.addUser(user);
    expect(parkingSystem.users).toHaveLength(1);
    expect(parkingSystem.getUser('1')).toEqual(user);
  });

  test('should add and get vehicle', () => {
    const vehicle = { id: '1', licensePlate: 'ABC123', make: 'Toyota', model: 'Camry' };
    parkingSystem.addVehicle(vehicle);
    expect(parkingSystem.vehicles).toHaveLength(1);
    expect(parkingSystem.getVehicle('1')).toEqual(vehicle);
  });

  test('should add and get payment', () => {
    const payment = { id: '1', amount: 100, status: 'completed' };
    parkingSystem.addPayment(payment);
    expect(parkingSystem.payments).toHaveLength(1);
    expect(parkingSystem.getPayment('1')).toEqual(payment);
  });

  test('should find available parking lot', () => {
    const lot1 = new ParkingLot('1', 'Full Lot', 100, 'Location 1');
    lot1.availableSpaces = 0;
    const lot2 = new ParkingLot('2', 'Available Lot', 100, 'Location 2');
    lot2.availableSpaces = 50;

    parkingSystem.addParkingLot(lot1);
    parkingSystem.addParkingLot(lot2);
    
    const availableLot = parkingSystem.findAvailableParkingLot();
    expect(availableLot).toEqual(lot2);
  });

  test('should return null when no parking lots are available', () => {
    const lot = new ParkingLot('1', 'Full Lot', 100, 'Location 1');
    lot.availableSpaces = 0;
    
    parkingSystem.addParkingLot(lot);
    
    const availableLot = parkingSystem.findAvailableParkingLot();
    expect(availableLot).toBeNull();
  });

  test('should update parking lot availability', () => {
    const lot = new ParkingLot('1', 'Test Lot', 100, 'Location 1');
    parkingSystem.addParkingLot(lot);
    
    parkingSystem.updateParkingLotAvailability('1', 5);
    expect(parkingSystem.parkingLots[0].availableSpaces).toBe(5);
  });
}); 
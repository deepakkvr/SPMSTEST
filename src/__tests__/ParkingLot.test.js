import { ParkingLot } from '../models/ParkingLot.js';

describe('ParkingLot', () => {
  let parkingLot;

  beforeEach(() => {
    parkingLot = new ParkingLot('1', 'Test Lot', 10, 'Test Location');
  });

  test('should initialize with correct properties', () => {
    expect(parkingLot.id).toBe('1');
    expect(parkingLot.name).toBe('Test Lot');
    expect(parkingLot.totalSpaces).toBe(10);
    expect(parkingLot.availableSpaces).toBe(10);
    expect(parkingLot.location).toBe('Test Location');
    expect(parkingLot.parkingSpaces).toHaveLength(10);
  });

  test('should find available parking space', () => {
    const space = parkingLot.findAvailableSpace();
    expect(space).toBeDefined();
    expect(space.isOccupied).toBe(false);
  });

  test('should update space status', () => {
    const space = parkingLot.findAvailableSpace();
    parkingLot.updateSpaceStatus(space.id, true);
    expect(parkingLot.parkingSpaces.find(s => s.id === space.id).isOccupied).toBe(true);
    expect(parkingLot.availableSpaces).toBe(9);
  });

  test('should calculate occupancy rate', () => {
    const space = parkingLot.findAvailableSpace();
    parkingLot.updateSpaceStatus(space.id, true);
    const occupancyRate = parkingLot.calculateOccupancyRate();
    expect(occupancyRate).toBe(0.1); // 1/10 spaces occupied
  });

  test('should return null when no spaces are available', () => {
    // Fill all spaces
    for (let i = 0; i < parkingLot.totalSpaces; i++) {
      const space = parkingLot.findAvailableSpace();
      parkingLot.updateSpaceStatus(space.id, true);
    }
    
    const space = parkingLot.findAvailableSpace();
    expect(space).toBeNull();
  });
}); 
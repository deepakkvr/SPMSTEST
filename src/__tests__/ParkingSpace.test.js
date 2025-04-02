import ParkingSpace from '../models/ParkingSpace';

describe('ParkingSpace', () => {
  let parkingSpace;

  beforeEach(() => {
    parkingSpace = new ParkingSpace('1', 'A1');
  });

  test('should initialize with correct properties', () => {
    expect(parkingSpace.id).toBe('1');
    expect(parkingSpace.number).toBe('A1');
    expect(parkingSpace.isOccupied).toBe(false);
    expect(parkingSpace.vehicle).toBeNull();
    expect(parkingSpace.entryTime).toBeNull();
  });

  test('should occupy parking space', () => {
    const vehicle = { id: '1', licensePlate: 'ABC123' };
    parkingSpace.occupy(vehicle);
    expect(parkingSpace.isOccupied).toBe(true);
    expect(parkingSpace.vehicle).toEqual(vehicle);
    expect(parkingSpace.entryTime).toBeInstanceOf(Date);
  });

  test('should vacate parking space', () => {
    const vehicle = { id: '1', licensePlate: 'ABC123' };
    parkingSpace.occupy(vehicle);
    parkingSpace.vacate();
    expect(parkingSpace.isOccupied).toBe(false);
    expect(parkingSpace.vehicle).toBeNull();
    expect(parkingSpace.entryTime).toBeNull();
  });

  test('should calculate parking duration', () => {
    const now = new Date();
    parkingSpace.entryTime = new Date(now.getTime() - 3600000); // 1 hour ago
    const duration = parkingSpace.calculateParkingDuration();
    expect(duration).toBeGreaterThanOrEqual(1); // At least 1 hour
  });
}); 
import { User } from '../models/User';

describe('User', () => {
  let user;

  beforeEach(() => {
    user = new User('1', 'Test User', 'test@example.com', '1234567890');
  });

  test('should create a user with correct properties', () => {
    expect(user.email).toBe('test@example.com');
    expect(user.name).toBe('Test User');
    expect(user.phoneNumber).toBe('1234567890');
    expect(user.vehicle).toBeNull();
  });

  test('should register a vehicle', () => {
    const vehicle = {
      licensePlate: 'ABC123',
      make: 'Toyota',
      model: 'Camry',
      color: 'Silver'
    };
    user.registerVehicle(vehicle);
    expect(user.vehicle).toEqual(vehicle);
  });

  test('should add parking history', () => {
    const parkingRecord = {
      lotId: '1',
      spaceId: 'A1',
      entryTime: new Date(),
      exitTime: new Date(),
      fee: 10
    };
    user.addParkingHistory(parkingRecord);
    expect(user.parkingHistory).toHaveLength(1);
    expect(user.parkingHistory[0]).toEqual(parkingRecord);
  });

  test('should get parking history', () => {
    const parkingRecord = {
      lotId: '1',
      spaceId: 'A1',
      entryTime: new Date(),
      exitTime: new Date(),
      fee: 10
    };
    user.addParkingHistory(parkingRecord);
    const history = user.getParkingHistory();
    expect(history).toEqual([parkingRecord]);
  });
}); 
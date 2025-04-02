import { Vehicle } from '../models/Vehicle';

describe('Vehicle', () => {
  let vehicle;

  beforeEach(() => {
    vehicle = new Vehicle('1', 'ABC123', 'Toyota', 'Camry', 'Silver');
  });

  test('should initialize with correct properties', () => {
    expect(vehicle.licensePlate).toBe('ABC123');
    expect(vehicle.make).toBe('Toyota');
    expect(vehicle.model).toBe('Camry');
    expect(vehicle.color).toBe('Silver');
  });

  test('should validate license plate format', () => {
    const validPlate = 'ABC123';
    const invalidPlate = '123'; // Too short

    expect(Vehicle.validateLicensePlate(validPlate)).toBe(true);
    expect(Vehicle.validateLicensePlate(invalidPlate)).toBe(false);
  });

  test('should get vehicle details', () => {
    const details = vehicle.getDetails();
    expect(details).toEqual({
      licensePlate: 'ABC123',
      make: 'Toyota',
      model: 'Camry',
      color: 'Silver'
    });
  });

  test('should update vehicle details', () => {
    vehicle.updateDetails({
      make: 'Honda',
      model: 'Accord',
      color: 'Black'
    });
    expect(vehicle.make).toBe('Honda');
    expect(vehicle.model).toBe('Accord');
    expect(vehicle.color).toBe('Black');
    expect(vehicle.licensePlate).toBe('ABC123'); // Should not change
  });
}); 
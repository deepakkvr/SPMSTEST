import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils';
import FindParking from '../FindParking';
import '@testing-library/jest-dom';
import { useOutletContext } from 'react-router-dom';

// Mock useOutletContext
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

// Mock useAuth
jest.mock('../../AuthContext', () => ({
  useAuth: () => ({
    user: {
      email: 'user@example.com',
      uid: '123',
      fullName: 'Test User'
    },
    logout: jest.fn()
  })
}));

describe('FindParking Component', () => {
  const mockParkingLots = {
    'test-lot-1': {
      Name: 'Test Parking Lot',
      location: 'Test Location',
      capacity: 100,
      availableSpots: 50,
      vehicleTypes: ['Car', 'Bike'],
      rating: { avgrate: 4.5 }
    },
  };

  beforeEach(() => {
    useOutletContext.mockReturnValue([mockParkingLots, {}]);
  });

  test('renders find parking page elements', async () => {
    renderWithProviders(<FindParking />);

    await waitFor(() => {
      expect(screen.getByText(/Find Parking spaces:/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/🔍Search Parking Lot.../i)).toBeInTheDocument();
      expect(screen.getByText(/Vehicle Type/i)).toBeInTheDocument();
    });
  });

  test('displays parking lot information', async () => {
    renderWithProviders(<FindParking />);

    await waitFor(() => {
      expect(screen.getByText('Test Parking Lot')).toBeInTheDocument();
      expect(screen.getByText('Test Location')).toBeInTheDocument();
      expect(screen.getByTestId('available-spots')).toHaveTextContent('50');
    });
  });

  test('filters parking lots by search query', async () => {
    renderWithProviders(<FindParking />);

    const searchInput = screen.getByPlaceholderText(/🔍Search Parking Lot.../i);
    fireEvent.change(searchInput, { target: { value: 'Test' } });

    await waitFor(() => {
      expect(screen.getByText('Test Parking Lot')).toBeInTheDocument();
    });
  });

  test('filters parking lots by vehicle type', async () => {
    renderWithProviders(<FindParking />);

    const vehicleTypeSelect = screen.getByLabelText(/Vehicle Type/i);
    fireEvent.change(vehicleTypeSelect, { target: { value: 'Car' } });

    await waitFor(() => {
      expect(screen.getByText('Test Parking Lot')).toBeInTheDocument();
    });
  });
}); 
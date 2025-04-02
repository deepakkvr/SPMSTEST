// Mock Firebase auth
const auth = {
  currentUser: null,
  onAuthStateChanged: jest.fn((callback) => {
    callback(null);
    return () => {};
  }),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({
      user: {
        email: 'test@example.com',
        uid: '123',
      },
    })
  ),
  signOut: jest.fn(() => Promise.resolve()),
  createUserWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({
      user: {
        email: 'test@example.com',
        uid: '123',
      },
    })
  ),
};

// Mock Firestore
const db = {
  collection: jest.fn(() => ({
    doc: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({
        exists: true,
        data: () => ({
          name: 'Test User',
          email: 'test@example.com',
          role: 'user',
        }),
      })),
      set: jest.fn(() => Promise.resolve()),
      update: jest.fn(() => Promise.resolve()),
      delete: jest.fn(() => Promise.resolve()),
    })),
    where: jest.fn(() => ({
      get: jest.fn(() => Promise.resolve({
        docs: [],
      })),
    })),
    add: jest.fn(() => Promise.resolve({ id: '123' })),
    get: jest.fn(() => Promise.resolve({
      docs: [],
    })),
  })),
};

export { auth, db };

// Add a test to prevent the "no tests" error
describe('Firebase Mock', () => {
  test('should export auth and db objects', () => {
    expect(auth).toBeDefined();
    expect(db).toBeDefined();
  });
}); 
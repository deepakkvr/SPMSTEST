import { render, screen, fireEvent } from "@testing-library/react";
import { AuthProvider } from "../AuthContext";
import Login from "../pages/Login";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MemoryRouter } from "react-router-dom";

// Mock Firebase auth
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({
    currentUser: null,
  })),
  signInWithEmailAndPassword: jest.fn(() =>
    Promise.resolve({ user: { email: "test@example.com" } })
  ),
  onAuthStateChanged: jest.fn((auth, callback) => {
    callback(auth.currentUser);
    return jest.fn();
  }),
}));

describe("Login Component", () => {
  const renderLogin = () => {
    return render(
      <AuthProvider>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </AuthProvider>
    );
  };

  it("renders login form elements", async () => {
    renderLogin();

    expect(await screen.findByText("Smart Parking Application")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("shows error for empty fields", async () => {
    renderLogin();

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(await screen.findByText("Please fill all fields :)")).toBeInTheDocument();
  });

  it("calls Firebase auth on valid submission", async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });

    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Login" }));

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.any(Object),
      "test@example.com",
      "password123"
    );
  });
});

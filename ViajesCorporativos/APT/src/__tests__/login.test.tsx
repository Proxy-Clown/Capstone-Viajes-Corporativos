import "@testing-library/jest-dom"
import React from "react"
import {render,screen,waitFor} from "@testing-library/react"
import NeoTravelFlowLogin from "../app/login/page"
import {userEvent} from "@testing-library/user-event"
import { signIn } from "@/src/server/users";
//TEST DE LOGIN CORRECTO
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>
const mockPush=jest.fn();
jest.mock("next/navigation",()=>({
    useRouter:()=>({
        push:mockPush,
        replace:jest.fn(),
        prefetch:jest.fn(),
    }),
}));


jest.mock("@/src/server/users", () => ({
  signIn: jest.fn(),
}))


const TEST_EMAIL = "test@example.com";
const TEST_PASSWORD = "securepassword"

describe("NeoTravelFlowLogin",()=>{
    beforeEach(()=>{
        jest.clearAllMocks();
    });
    it("render login",()=>{
        render(<NeoTravelFlowLogin/>);
        expect(
            screen.getByRole("heading",{level: 2})
        ).toBeInTheDocument();
    
   const emailInput = screen.getByPlaceholderText(/Ingresa tu correo/i);;
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "text");

    const passwordInput = screen.getByPlaceholderText(/Ingresa tu contraseña/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");

    const loginButton = screen.getByRole("button", { name: /Ingresar Sesion/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeEnabled();
    });
     it("should call signIn and redirect to /Home on successful login", async () => {
    
    mockSignIn.mockResolvedValue({ success: true, message:"" });

    render(<NeoTravelFlowLogin />);
    const user = userEvent.setup();

    
    const emailInput = screen.getByPlaceholderText(/Ingresa tu correo/i);
    const passwordInput = screen.getByPlaceholderText(/Ingresa tu contraseña/i);
    const loginButton = screen.getByRole("button", { name: /Ingresar Sesion/i });

    
    await user.type(emailInput, TEST_EMAIL);
    await user.type(passwordInput, TEST_PASSWORD);
    await user.click(loginButton);

    
    await waitFor(() => {
      expect(mockSignIn).toHaveBeenCalledTimes(1);
      expect(mockSignIn).toHaveBeenCalledWith(TEST_EMAIL,TEST_PASSWORD);
      expect(mockPush).toHaveBeenCalledWith("/Home");
    });
  });

})
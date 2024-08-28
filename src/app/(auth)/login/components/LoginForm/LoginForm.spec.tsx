import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { signIn } from "next-auth/react";

import { LoginForm } from ".";

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      replace: () => null
    };
  }
}));

vi.mock("next-auth/react", () => ({
  signIn: vi.fn()
}));

describe("LoginForm", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it("Should be able to call the authentication function with the correct credentials", async () => {
    const rawEmail = "Test@gmail.com";

    const emailInput = screen.getByPlaceholderText("exemplo@gmail.com");

    fireEvent.change(emailInput, {
      target: {
        value: rawEmail
      }
    });

    const passwordInput = screen.getByPlaceholderText("********");

    fireEvent.change(passwordInput, {
      target: {
        value: "password123"
      }
    });

    const submitButton = screen.getByText("Entrar");

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: rawEmail.toLowerCase(),
        password: "password123",
        redirect: false
      });
    });
  });

  it("Should be able to display validation errors on invalid input", async () => {
    const emailErrorMessageText = "O campo deve conter um e-mail válido.";
    const passwordErrorMessageText =
      "A senha deve conter no mínimo 8 caracteres.";

    expect(screen.queryByText(emailErrorMessageText)).toBeNull();
    expect(screen.queryByText(passwordErrorMessageText)).toBeNull();

    const submitButton = screen.getByText("Entrar");

    fireEvent.click(submitButton);

    const emailErrorMessage = await screen.findByText(emailErrorMessageText);

    const passwordErrorMessage = await screen.findByText(
      passwordErrorMessageText
    );

    expect(emailErrorMessage).toBeInTheDocument();
    expect(passwordErrorMessage).toBeInTheDocument();
  });
});

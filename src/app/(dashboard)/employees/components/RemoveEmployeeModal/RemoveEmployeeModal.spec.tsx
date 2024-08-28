import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TestProviders } from "@test/utils/providers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { employeesService } from "@/services/employees";

import { RemoveEmployeeModal } from ".";

vi.mock("@/services/employees", () => ({
  employeesService: {
    register: vi.fn(),
    list: vi.fn(),
    remove: vi.fn(),
    edit: vi.fn()
  }
}));

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      refresh: () => null
    };
  }
}));

describe("RemoveEmployeeModal", () => {
  beforeEach(() => {
    render(<RemoveEmployeeModal employeeId="64e48d08d3c7e4d8f0c5b6e3" />, {
      wrapper: TestProviders
    });
  });

  it("Should be able to open the modal when the trigger button is clicked", () => {
    const triggerButton = screen.getByRole("button", {
      name: /remover funcionário/i
    });

    fireEvent.click(triggerButton);

    const modalTitle = screen.queryByRole("heading", {
      name: /remover funcionário/i
    });

    expect(modalTitle).toBeInTheDocument();
  });

  it("Should be able to close the modal when the cancel button is clicked", async () => {
    const triggerButton = screen.getByRole("button", {
      name: /remover funcionário/i
    });

    fireEvent.click(triggerButton);

    const modalTitle = screen.queryByRole("heading", {
      name: /remover funcionário/i
    });

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });

    fireEvent.click(cancelButton);

    expect(modalTitle).not.toBeInTheDocument();
  });

  it("Should be able to call handleRemoveEmployee when the remove button is clicked", async () => {
    const triggerButton = screen.getByRole("button", {
      name: /remover funcionário/i
    });

    fireEvent.click(triggerButton);

    const removeButton = screen.getByRole("button", { name: /remover/i });

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(employeesService.remove).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "64e48d08d3c7e4d8f0c5b6e3"
        })
      );
    });
  });
});

import { TestProviders } from "@test/utils/providers";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { salesService } from "@/services/sales";

import { RemoveSaleModal } from ".";

vi.mock("@/services/sales", () => ({
  salesService: {
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

describe("RemoveSaleModal", () => {
  let triggerButton: HTMLElement;

  beforeEach(() => {
    render(<RemoveSaleModal saleId="64e48d08d3c7e4d8f0c5b6e3" />, {
      wrapper: TestProviders
    });

    triggerButton = screen.getByRole("button", {
      name: /remover venda/i
    });
  });

  it("Should be able to open the modal when the trigger button is clicked", () => {
    fireEvent.click(triggerButton);

    const modalTitle = screen.queryByRole("heading", {
      name: /remover venda/i
    });

    expect(modalTitle).toBeInTheDocument();
  });

  it("Should be able to close the modal when the cancel button is clicked", () => {
    fireEvent.click(triggerButton);

    const modalTitle = screen.getByRole("heading", {
      name: /remover venda/i
    });

    const cancelButton = screen.getByRole("button", { name: /cancelar/i });

    fireEvent.click(cancelButton);

    expect(modalTitle).not.toBeInTheDocument();
  });

  it("Should be able to call salesService.remove when the remove button is clicked", async () => {
    fireEvent.click(triggerButton);

    const removeButton = screen.getByRole("button", { name: /remover/i });

    fireEvent.click(removeButton);

    await waitFor(() => {
      expect(salesService.remove).toHaveBeenCalledWith(
        expect.objectContaining({
          id: "64e48d08d3c7e4d8f0c5b6e3"
        })
      );
    });
  });
});
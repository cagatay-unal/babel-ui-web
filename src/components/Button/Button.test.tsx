import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("tıklanınca onClick çağrılır", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Kaydet</Button>);
    await userEvent.click(screen.getByRole("button", { name: "Kaydet" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Divider } from "./Divider";

afterEach(cleanup);

describe("Divider Component", () => {
  it("Separator olarak render ediliyor mu?", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });

  it("Orientation default horizontal olarak render ediliyor mu ?", () => {
    render(<Divider />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
  });

  it("Label render ediyor mu ?", () => {
    render(<Divider label="Divider Label" />);
    expect(screen.getByText("Divider Label")).toBeInTheDocument();
  });

  it("Orientation vertical render ediliyor mu ?", () => {
    render(<Divider orientation="vertical" />);
    expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  });

  it("Variant stili doğru uyguluyor mu ?", () => {
    const { rerender } = render(<Divider variant="dotted" />);
    expect(screen.getByRole("separator")).toHaveClass(
      "before:border-dotted",
      "after:border-dotted",
    );
    rerender(<Divider variant="dashed" />);
    expect(screen.getByRole("separator")).toHaveClass(
      "before:border-dashed",
      "after:border-dashed",
    );
  });

  it("Custom class çalışıyor mu ?", () => {
    render(<Divider className="custom-class" data-testid="divider-element" />);
    expect(screen.getByTestId("divider-element")).toHaveClass("custom-class");
  });
});

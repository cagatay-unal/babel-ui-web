import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Skeleton } from "./Skeleton";

afterEach(cleanup);

describe("Skeleton Component", () => {
  it("Component render ediliyor mu ?", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toBeInTheDocument();
  });

  it("Default rounded-lg oluyor mu ?", () => {
    render(<Skeleton data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-lg");
  });

  it("Eğer shape circle ise rounded-full oluyor mu ?", () => {
    render(<Skeleton shape="circle" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("rounded-full");
  });

  it("Size uygulanıyor mu ?", () => {
    render(<Skeleton size={16} data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("size-16");
  });

  it("Width, height ve radius stilleri uygulanıyor mu ?", () => {
    render(<Skeleton width="120px" height="40px" radius="8px" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveStyle({
      width: "120px",
      height: "40px",
      borderRadius: "8px",
    });
  });

  it("Custom className uygulanıyor mu ?", () => {
    render(<Skeleton className="özel-sınıf" data-testid="skeleton" />);
    expect(screen.getByTestId("skeleton")).toHaveClass("özel-sınıf");
  });
});

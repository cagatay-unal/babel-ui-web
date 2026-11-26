import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Icon } from "./Icon";
import type { IconName } from "./types";

describe("Icon Component", () => {
  it("İstenen simgeyi render ediyor mu ?", () => {
    render(<Icon name="check" aria-label="Check" />);
    expect(screen.getByRole("img", { name: "Check" })).toBeInTheDocument();
  });

  it("Bilinmeyen simge adı için uyarı veriyor mu ?", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    try {
      const { container } = render(<Icon name={"bilinmeyen-simge" as IconName} />);

      expect(warn).toHaveBeenCalledWith(
        '[Icon] Bilinmeyen simge adı: "bilinmeyen-simge". Simge oluşturucuyu çalıştırdınız mı?',
      );
      expect(container).toBeEmptyDOMElement();
    } finally {
      warn.mockRestore();
    }
  });
});

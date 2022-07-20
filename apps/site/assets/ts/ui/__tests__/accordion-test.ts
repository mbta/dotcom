import setupAccordion from "../accordion";
import { fireEvent, getByText } from "@testing-library/dom";

const body = `
<div class="c-accordion-ui c-accordion-ui--no-bootstrap" role="presentation">
${[1, 2, 3].map(
  (_, i) => `
  <h3 class="c-accordion-ui__heading">
    <button class="c-accordion-ui__trigger c-accordion-ui__title"
      id="${i}-title"
      aria-expanded="false"
      aria-controls="${i}-section">
      Heading ${i}
      <div class="c-accordion-ui__indicator">
        <span class="c-indicator__content c-indicator__content--angle"></span>
      </div>
    </button>
  </h3>
  <div class="c-accordion-ui__content"
      id="${i}-section"
      role="region"
      aria-labelledby="${i}-title"
      tabindex="0">
    Content for accordion ${i}
  </div>`
)}
</div>`;

describe("accordion", () => {
  beforeAll(() => {
    document.body.innerHTML = body;
    setupAccordion(document.documentElement);
  });

  test("toggles aria-expanded on click", () => {
    const btn1 = document.querySelector("button");
    expect(btn1?.getAttribute("aria-expanded")).toBe("false");
    document.querySelector("button")?.click();
    expect(btn1?.getAttribute("aria-expanded")).toBe("true");
    document.querySelector("button")?.click();
    expect(btn1?.getAttribute("aria-expanded")).toBe("false");
  });

  test("toggles aria-expanded on Space", () => {
    const btn = getByText(document.body, /Heading 0/);
    btn.focus();

    expect(btn.getAttribute("aria-expanded")).toBe("false");

    btn.focus();

    fireEvent.keyUp(document.activeElement!, { code: "Space" });
    expect(document.activeElement!.getAttribute("aria-expanded")).toBe("true");

    fireEvent.keyUp(document.activeElement!, { code: "Space" });
    expect(document.activeElement!.getAttribute("aria-expanded")).toBe("false");
  });

  test("navigates headings with ArrowUp, ArrowDown", () => {
    const btn = getByText(document.body, /Heading 0/);
    btn.focus();

    fireEvent.keyUp(document.activeElement!, { code: "ArrowDown" });
    expect(document.activeElement?.textContent).toContain("Heading 1");

    fireEvent.keyUp(document.activeElement!, { code: "ArrowDown" });
    expect(document.activeElement?.textContent).toContain("Heading 2");

    fireEvent.keyUp(document.activeElement!, { code: "ArrowUp" });
    expect(document.activeElement?.textContent).toContain("Heading 1");

    fireEvent.keyUp(document.activeElement!, { code: "ArrowUp" });
    expect(document.activeElement?.textContent).toContain("Heading 0");
  });

  test("opening section closes other open section", () => {
    const btn0 = getByText(document.body, "Heading 0");
    const btn1 = getByText(document.body, "Heading 1");
    const btn2 = getByText(document.body, "Heading 2");

    btn1.click();
    expect(btn0.getAttribute("aria-expanded")).toBe("false");
    expect(btn1.getAttribute("aria-expanded")).toBe("true");
    expect(btn2.getAttribute("aria-expanded")).toBe("false");

    btn2.click();
    expect(btn0.getAttribute("aria-expanded")).toBe("false");
    expect(btn1.getAttribute("aria-expanded")).toBe("false");
    expect(btn2.getAttribute("aria-expanded")).toBe("true");

    btn0.click();
    expect(btn0.getAttribute("aria-expanded")).toBe("true");
    expect(btn1.getAttribute("aria-expanded")).toBe("false");
    expect(btn2.getAttribute("aria-expanded")).toBe("false");

    btn0.click(); // close
    expect(btn0.getAttribute("aria-expanded")).toBe("false");
    expect(btn1.getAttribute("aria-expanded")).toBe("false");
    expect(btn2.getAttribute("aria-expanded")).toBe("false");
  });
});

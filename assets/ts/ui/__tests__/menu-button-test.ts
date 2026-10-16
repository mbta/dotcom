/* eslint-disable testing-library/no-dom-import, testing-library/no-node-access */
// Exercise native LiveView DOM patches rather than a React-rendered component.
import { fireEvent } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import MenuButton from "../menu-button";

describe("MenuButton", () => {
  let controller: MenuButton;
  let button: HTMLButtonElement;
  let menu: HTMLUListElement;
  let items: HTMLElement[];

  beforeEach(() => {
    document.body.innerHTML = `
      <button id="before">Before</button>
      <div id="picker">
        <button aria-haspopup="menu" aria-expanded="false">Sort</button>
        <ul role="menu" hidden>
          <li role="menuitemradio" tabindex="-1" phx-value-option="newest">Newest</li>
          <li role="separator"></li>
          <li role="menuitemradio" tabindex="-1" phx-value-option="oldest" aria-checked="true"><span>Oldest</span></li>
          <li role="menuitemradio" tabindex="-1" phx-value-option="name">Name</li>
        </ul>
      </div>
      <button id="after">After</button>`;
    const root = document.getElementById("picker")!;
    button = root.querySelector("button")!;
    menu = root.querySelector("ul")!;
    items = Array.from(menu.querySelectorAll('[role="menuitemradio"]'));
    controller = new MenuButton(root);
  });

  afterEach(() => {
    controller.destroy();
    document.body.innerHTML = "";
    jest.restoreAllMocks();
    jest.useRealTimers();
  });

  function key(value: string): void {
    fireEvent.keyDown(document.activeElement!, { key: value });
  }

  it("opens at the selected item and toggles closed", () => {
    fireEvent.click(button);
    expect(items[1]).toHaveFocus();
    expect(menu).not.toHaveAttribute("hidden");
    expect(button).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(button);
    expect(menu).toHaveAttribute("hidden");
  });

  it.each(["{Enter}", " "])(
    "opens with native button activation: %s",
    async input => {
      const user = userEvent.setup();
      button.focus();
      await user.keyboard(input);
      expect(items[1]).toHaveFocus();
    }
  );

  it("falls back to the first item when no item is selected", () => {
    items[1].removeAttribute("aria-checked");
    fireEvent.click(button);
    expect(items[0]).toHaveFocus();
  });

  it("navigates first/last, wraps arrows, and skips separators", () => {
    button.focus();
    key("ArrowDown");
    expect(items[0]).toHaveFocus();
    key("ArrowUp");
    expect(items[2]).toHaveFocus();
    key("ArrowDown");
    expect(items[0]).toHaveFocus();
    key("End");
    expect(items[2]).toHaveFocus();
    key("Home");
    expect(items[0]).toHaveFocus();
    key("Escape");
    expect(button).toHaveFocus();
    expect(menu).toHaveAttribute("hidden");
    key("ArrowUp");
    expect(items[2]).toHaveFocus();
  });

  it.each(["{Tab}", "{Shift>}{Tab}{/Shift}"])(
    "closes without trapping focus with %s",
    async input => {
      const user = userEvent.setup();
      fireEvent.click(button);
      await user.keyboard(input);
      expect(menu).toHaveAttribute("hidden");
      expect(
        input === "{Tab}" ? document.getElementById("after") : button
      ).toHaveFocus();
      if (input !== "{Tab}") {
        await user.keyboard(input);
        expect(document.getElementById("before")).toHaveFocus();
      }
    }
  );

  it.each(["Enter", " "])(
    "activates exactly once with %s and restores focus",
    value => {
      const click = jest.fn();
      items[1].addEventListener("click", click);
      fireEvent.click(button);
      key(value);
      expect(click).toHaveBeenCalledTimes(1);
      expect(items[1]).toHaveAttribute("phx-value-option", "oldest");
      expect(button).toHaveFocus();
      expect(menu).toHaveAttribute("hidden");
    }
  );

  it("closes when clicking nested item content", () => {
    fireEvent.click(button);
    fireEvent.click(items[1].querySelector("span")!);
    expect(button).toHaveFocus();
    expect(menu).toHaveAttribute("hidden");
  });

  it("dismisses outside without stealing focus", () => {
    fireEvent.click(button);
    const outside = document.getElementById("after")!;
    fireEvent.pointerDown(outside);
    outside.focus();
    expect(menu).toHaveAttribute("hidden");
    expect(outside).toHaveFocus();
  });

  it("dismisses when focus leaves the widget", () => {
    fireEvent.click(button);
    document.getElementById("after")!.focus();
    expect(menu).toHaveAttribute("hidden");
  });

  it("restores client state and option identity after a server patch", () => {
    fireEvent.click(button);
    controller.beforeUpdate();
    menu.innerHTML = `
      <li role="menuitemradio" tabindex="-1" phx-value-option="oldest">Oldest</li>
      <li role="menuitemradio" tabindex="-1" phx-value-option="newest">Newest</li>`;
    menu.hidden = true;
    button.setAttribute("aria-expanded", "false");
    controller.updated();
    expect(menu).not.toHaveAttribute("hidden");
    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(menu.firstElementChild).toHaveFocus();
  });

  it("focuses a surviving item when the focused option is removed", () => {
    fireEvent.click(button);
    controller.beforeUpdate();
    items[1].remove();
    controller.updated();
    expect(items[2]).toHaveFocus();
  });

  it("closes and returns focus when all options are removed", () => {
    fireEvent.click(button);
    controller.beforeUpdate();
    menu.innerHTML = "";
    controller.updated();
    expect(menu).toHaveAttribute("hidden");
    expect(button).toHaveFocus();
  });

  it("does not steal focus moved outside during a patch", () => {
    fireEvent.click(button);
    controller.beforeUpdate();
    document.getElementById("after")!.focus();
    controller.updated();
    expect(document.getElementById("after")).toHaveFocus();
    expect(menu).toHaveAttribute("hidden");
  });

  it("does not open an empty menu", () => {
    menu.innerHTML = "";
    fireEvent.click(button);
    expect(menu).toHaveAttribute("hidden");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("supports buffered typeahead, repeated characters, and a timeout", () => {
    jest.useFakeTimers();
    fireEvent.click(button);
    key("n");
    expect(items[2]).toHaveFocus();
    key("e");
    expect(items[0]).toHaveFocus();
    jest.advanceTimersByTime(600);
    key("o");
    expect(items[1]).toHaveFocus();
    key("n");
    jest.advanceTimersByTime(600);
    key("n");
    expect(items[0]).toHaveFocus();
    key("n");
    expect(items[2]).toHaveFocus();
  });

  it("ignores modified keys and composition for typeahead", () => {
    fireEvent.click(button);
    fireEvent.keyDown(items[1], { key: "n", ctrlKey: true });
    fireEvent.keyDown(items[1], { key: "n", isComposing: true });
    expect(items[1]).toHaveFocus();
  });

  it("shifts a menu overflowing the right viewport edge back into view", () => {
    jest.spyOn(menu, "getBoundingClientRect").mockReturnValue({
      left: window.innerWidth - 50,
      right: window.innerWidth + 150,
      width: 200,
      top: 0,
      bottom: 100,
      height: 100,
      x: 0,
      y: 0,
      toJSON: () => ({})
    });
    fireEvent.click(button);
    expect(menu.style.left).toBe("-166px");
    fireEvent(window, new Event("resize"));
    expect(menu.style.left).toBe("-166px");
  });

  it("refreshes references and retains event handling when children are replaced", () => {
    const root = document.getElementById("picker")!;
    const markup = root.innerHTML;
    root.innerHTML = markup;
    controller.updated();
    const replacement = root.querySelector("button")!;
    fireEvent.click(replacement);
    expect(replacement).toHaveAttribute("aria-expanded", "true");
    key("Escape");
    expect(replacement).toHaveFocus();
  });

  it("removes listeners on destruction", () => {
    controller.destroy();
    fireEvent.click(button);
    expect(menu).toHaveAttribute("hidden");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("removes outside-pointer and resize listeners on destruction", () => {
    fireEvent.click(button);
    controller.destroy();
    const measure = jest.spyOn(menu, "getBoundingClientRect");
    fireEvent.pointerDown(document.getElementById("after")!);
    fireEvent(window, new Event("resize"));
    expect(menu).not.toHaveAttribute("hidden");
    expect(measure).not.toHaveBeenCalled();
  });

  it("leaves focus unchanged when typeahead has no match", () => {
    fireEvent.click(button);
    key("z");
    expect(items[1]).toHaveFocus();
  });

  it("keeps keyboard focus independent of the selected option after patches", () => {
    fireEvent.click(button);
    key("ArrowDown");
    controller.beforeUpdate();
    items[1].setAttribute("aria-checked", "false");
    items[0].setAttribute("aria-checked", "true");
    controller.updated();
    expect(items[2]).toHaveFocus();
  });

  it("reports malformed markup", () => {
    expect(() => new MenuButton(document.createElement("div"))).toThrow(
      'missing button or [role="menu"]'
    );
  });
});

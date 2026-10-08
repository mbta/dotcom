type Edge = "first" | "last";
type FocusedOption = { value: string | null; index: number };

const itemSelector = '[role="menuitemradio"]';
const typeaheadTimeout = 500;
const viewportGutter = 16;

// Open state is client-owned; the checked option remains server-owned.
export default class MenuButton {
  private button!: HTMLButtonElement;

  private menu!: HTMLUListElement;

  private isOpen = false;

  private focusedOption?: FocusedOption;

  private search = "";

  private lastTypedAt = 0;

  constructor(private readonly el: HTMLElement) {
    this.refreshElements();
    this.sync();
    el.addEventListener("click", this.onClick);
    el.addEventListener("keydown", this.onKeydown);
    el.addEventListener("focusout", this.onFocusout);
    document.addEventListener("pointerdown", this.onDocumentPointerDown);
    window.addEventListener("resize", this.positionMenu);
  }

  beforeUpdate(): void {
    const items = this.items();
    const index = items.findIndex(item => item === document.activeElement);
    this.focusedOption =
      this.isOpen && index !== -1
        ? { value: items[index].getAttribute("phx-value-option"), index }
        : undefined;
  }

  updated(): void {
    const previous = this.focusedOption;
    this.focusedOption = undefined;
    this.refreshElements();
    this.sync();
    if (!this.isOpen) return;

    const items = this.items();
    if (!items.length) {
      this.close(true);
      return;
    }

    this.positionMenu();
    if (
      previous &&
      (document.activeElement === document.body ||
        this.menu.contains(document.activeElement))
    ) {
      const target =
        items.find(
          item =>
            previous.value !== null &&
            item.getAttribute("phx-value-option") === previous.value
        ) ?? items[Math.min(previous.index, items.length - 1)];
      target.focus();
    }
  }

  destroy(): void {
    this.el.removeEventListener("click", this.onClick);
    this.el.removeEventListener("keydown", this.onKeydown);
    this.el.removeEventListener("focusout", this.onFocusout);
    document.removeEventListener("pointerdown", this.onDocumentPointerDown);
    window.removeEventListener("resize", this.positionMenu);
  }

  private refreshElements(): void {
    const button = this.el.querySelector<HTMLButtonElement>(
      '[aria-haspopup="menu"]'
    );
    const menu = this.el.querySelector<HTMLUListElement>('[role="menu"]');
    if (!button || !menu) {
      throw new Error(
        `MenuButton hook #${this.el.id}: missing button or [role="menu"]`
      );
    }
    this.button = button;
    this.menu = menu;
  }

  private items(): HTMLElement[] {
    return Array.from(this.menu.querySelectorAll<HTMLElement>(itemSelector));
  }

  private sync(): void {
    this.menu.hidden = !this.isOpen;
    this.button.setAttribute("aria-expanded", String(this.isOpen));
  }

  private open(edge?: Edge): void {
    const items = this.items();
    if (!items.length) return;
    this.isOpen = true;
    this.search = "";
    this.sync();
    this.positionMenu();
    let target = items[0];
    if (edge === "last") target = items[items.length - 1];
    else if (!edge)
      target =
        items.find(item => item.getAttribute("aria-checked") === "true") ??
        target;
    target.focus();
  }

  private close(returnFocus = false): void {
    this.isOpen = false;
    this.search = "";
    this.sync();
    if (returnFocus) this.button.focus();
  }

  private focusAt(index: number): void {
    const items = this.items();
    if (!items.length) return;
    items[(index + items.length) % items.length].focus();
  }

  private positionMenu = (): void => {
    if (!this.isOpen) return;
    this.menu.style.left = "0px";
    const { left, width } = this.menu.getBoundingClientRect();
    const clampedLeft = Math.max(
      viewportGutter,
      Math.min(left, window.innerWidth - viewportGutter - width)
    );
    this.menu.style.left = `${clampedLeft - left}px`;
  };

  private onClick = (event: MouseEvent): void => {
    const { target } = event;
    if (!(target instanceof Element)) return;
    if (this.button.contains(target)) {
      if (this.isOpen) this.close();
      else this.open();
    } else if (this.menu.contains(target) && target.closest(itemSelector)) {
      // Leave the click bubbling so LiveView still dispatches phx-click.
      this.close(true);
    }
  };

  private onFocusout = (event: FocusEvent): void => {
    if (this.focusedOption && event.relatedTarget === null) return;
    if (
      this.isOpen &&
      (!(event.relatedTarget instanceof Node) ||
        !this.el.contains(event.relatedTarget))
    )
      this.close();
  };

  private onDocumentPointerDown = (event: PointerEvent): void => {
    if (
      this.isOpen &&
      event.target instanceof Node &&
      !this.el.contains(event.target)
    )
      this.close();
  };

  private onKeydown = (event: KeyboardEvent): void => {
    if (event.isComposing) return;
    if (event.target === this.button) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        this.open(event.key === "ArrowDown" ? "first" : "last");
      }
      return;
    }
    if (
      !this.isOpen ||
      !(event.target instanceof Node) ||
      !this.menu.contains(event.target)
    )
      return;

    const items = this.items();
    const current = items.findIndex(item => item === document.activeElement);
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp":
        event.preventDefault();
        this.focusAt(current + (event.key === "ArrowDown" ? 1 : -1));
        break;
      case "Home":
      case "End":
        event.preventDefault();
        this.focusAt(event.key === "Home" ? 0 : items.length - 1);
        break;
      case "Escape":
        event.preventDefault();
        this.close(true);
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        items[current]?.click();
        break;
      case "Tab":
        // Shift+Tab returns to the trigger; another Shift+Tab leaves the widget.
        if (event.shiftKey) event.preventDefault();
        this.close(true);
        break;
      default:
        if (
          event.key.length === 1 &&
          !event.ctrlKey &&
          !event.metaKey &&
          !event.altKey
        ) {
          event.preventDefault();
          this.typeahead(items, current, event.key.toLowerCase());
        }
    }
  };

  private typeahead(
    items: HTMLElement[],
    current: number,
    character: string
  ): void {
    const now = Date.now();
    this.search =
      now - this.lastTypedAt > typeaheadTimeout
        ? character
        : this.search + character;
    this.lastTypedAt = now;
    if (Array.from(this.search).every(value => value === character))
      this.search = character;

    const orderedItems = items
      .slice(current + 1)
      .concat(items.slice(0, current + 1));
    if (this.search.length > 1 && current !== -1)
      orderedItems.unshift(items[current]);
    const match = (prefix: string): HTMLElement | undefined =>
      orderedItems.find(item =>
        (item.textContent ?? "")
          .trim()
          .toLowerCase()
          .startsWith(prefix)
      );
    let target = match(this.search);
    if (!target) {
      this.search = character;
      target = match(character);
    }
    target?.focus();
  }
}

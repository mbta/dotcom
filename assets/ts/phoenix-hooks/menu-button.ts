import MenuButtonController from "../ui/menu-button";

interface MenuButtonState {
  el: HTMLElement;
  menuButton: MenuButtonController;
}

const MenuButton: {
  mounted(): void;
  beforeUpdate(): void;
  updated(): void;
  destroyed(): void;
} & ThisType<MenuButtonState> = {
  mounted() {
    this.menuButton = new MenuButtonController(this.el);
  },
  beforeUpdate() {
    this.menuButton.beforeUpdate();
  },
  updated() {
    this.menuButton.updated();
  },
  destroyed() {
    this.menuButton.destroy();
  }
};

export default MenuButton;

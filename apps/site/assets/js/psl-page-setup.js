function selectButton(button) {
  const groupName = button.dataset.group;
  button.classList.add("selected");
  togglePslFilter(groupName);
}

function togglePslFilter(pslType) {
  const locationCards = [
    ...document.querySelectorAll(".c-sales-locations__card")
  ];

  let cardCount = 0;
  locationCards.forEach(card => {
    const cardType = card.dataset.psltype;

    if (!pslTypeMatch(cardType, pslType) || cardCount > 11) {
      card.classList.add("hidden");
    } else {
      card.classList.remove("hidden");
      cardCount++;
    }
  });
}

function pslTypeMatch(cardType, buttonType) {
  return (
    buttonType.toLowerCase().includes("all") ||
    cardType.toLowerCase() === buttonType.toLowerCase() ||
    cardType.toLowerCase().includes("both")
  );
}

export function setupPslFilterButtons() {
  const pslButtons = [...document.querySelectorAll(".psl-type-button")];

  pslButtons.forEach(button => {
    button.addEventListener("click", () => {
      // deselect inactive buttons
      pslButtons.forEach(b => {
        if (b !== button) {
          b.classList.remove("selected");
        }
      });
      selectButton(button);
    });

    // If the user navigates by keyboard, simulate click on enter-key press
    button.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        button.click();
      }
    });
  });

  selectButton(pslButtons[0]);
}

export default function() {
  document.addEventListener(
    "turbolinks:load",
    () => {
      const pslButtons = document.querySelector(".psl-types-buttons");
      if (pslButtons) {
        pslButtons.classList.remove("hidden");
        setupPslFilterButtons();
      }
    },
    { passive: true }
  );
}

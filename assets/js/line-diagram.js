const updatePatternOffsets = () => {
  const cards = document.getElementsByClassName("stop_card");
  let offsetSum = 0;
  for (let i = 0; i < cards.length; i++) {
    let stop_id = cards[i].id.split("-");
    stop_id.shift();
    stop_id = stop_id.join("-");
    const pattern = document.getElementById(`diagonalHatch-${stop_id}`);
    if (pattern) {
      const bbox = cards[i].getBoundingClientRect();
      const svg = pattern.parentNode.parentNode;
      const rot = svg.createSVGTransform();
      const move = svg.createSVGTransform();
      rot.setRotate(45, 0, 0);
      move.setTranslate(0, 0.5 - bbox.top);
      pattern.patternTransform.baseVal.initialize(move);
      pattern.patternTransform.baseVal.appendItem(rot);
    }
  }
};

export default () => {
  window.addEventListener("resize", updatePatternOffsets);
  window.addEventListener("phx:page-loading-stop", updatePatternOffsets);
};

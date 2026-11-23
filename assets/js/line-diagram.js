const updatePatternOffsets = ()=>{
  const PATTERN_HEIGHT=27;
  const cards = document.getElementsByClassName("stop_card");
  let offsetSum=0;
  for(let i=1;i<cards.length;i++){
    offsetSum=(offsetSum+(cards[i-1].offsetHeight))%PATTERN_HEIGHT;
    let stop_id = cards[i].id.split("-")
    stop_id.shift();
    stop_id=stop_id.join("-");
    const pattern = document.getElementById(`diagonalHatch-${stop_id}`);
    if(pattern){
      const svg = pattern.parentNode.parentNode;
      const rot = svg.createSVGTransform();
      const move = svg.createSVGTransform();
      rot.setRotate(45,0,0);
      move.setTranslate(0, PATTERN_HEIGHT - offsetSum);
      pattern.patternTransform.baseVal.initialize(move);
      pattern.patternTransform.baseVal.appendItem(rot);
    }
  }

}

export default () => {
    window.addEventListener("resize", updatePatternOffsets);
    window.addEventListener("phx:page-loading-stop", updatePatternOffsets);
}
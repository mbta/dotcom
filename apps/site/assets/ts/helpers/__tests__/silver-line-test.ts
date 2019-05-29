import { isSilverLine } from "../silver-line";

describe("isSilverLine", () => {
  it("identifies silver line routes", () => {
    ["741", "742", "743", "746", "749", "751"].forEach(id => {
      expect(isSilverLine(id)).toEqual(true);
    });
  });

  it("returns false if route is not silver line", () => {
    expect(isSilverLine("1")).toEqual(false);
  });
});

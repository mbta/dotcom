import * as mobileDetect from "../../../helpers/mobileDetect";
import { getExternalMapURI } from "../../components/ExternalMapLink";

describe("getExternalMapURI", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return a uri with a map scheem if the user is on an iPhone", () => {
    jest.spyOn(mobileDetect, "isIPhone").mockImplementation(() => true);
    const uri = getExternalMapURI(45.001, -35.001, "asdf");
    expect(uri).toContain("maps://");
    expect(uri).not.toContain("https://");
  });

  it("should return a uri an https scheme for all non iPhone users", () => {
    jest.spyOn(mobileDetect, "isIPhone").mockImplementation(() => false);
    const uri = getExternalMapURI(45.001, -35.001, "asdf");
    expect(uri).not.toContain("maps://");
    expect(uri).toContain("https://");
  });

  it("should return a query containing the name if name is passed in and lat long", () => {
    const uri = getExternalMapURI(45.001, -35.001, "asdf");
    expect(uri).toContain("query=45.001,-35.001");
    expect(uri).toContain("q=asdf");
    expect(uri).toContain("sll=45.001,-35.001");
  });

  it("should query the latitude and longitude if no name is passed in", () => {
    const uri = getExternalMapURI(45.001, -35.001);
    expect(uri).toContain("query=45.001,-35.001");
    expect(uri).toContain("q=45.001,-35.001");
  });
});

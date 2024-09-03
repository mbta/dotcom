import { assert, expect } from "chai";
import jsdom from "mocha-jsdom";
import sinon from "sinon";
import { AlgoliaResults } from "../algolia-results";
import testConfig from "./../../ts/jest.config";

const { testURL } = testConfig;

describe("AlgoliaResults", () => {
  jsdom({
    url: testURL
  });
  var search;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="icon-feature-stop">stop-icon</div>
      <div id="icon-feature-commuter_rail">commuter-rail-icon</div>
      <div id="icon-feature-bus">bus-icon</div>
      <div id="icon-feature-orange_line">orange-line-icon</div>
      <div id="icon-feature-green_line_b">green-line-b-icon</div>
      <div id="search-results"></div>
    `;
    window.jQuery = jsdom.rerequire("jquery");
    Object.defineProperty(window, "location", {
      value: {
        assign: sinon.spy()
      }
    });
    window.encodeURIComponent = string => {
      return string.replace(/\s/g, "%20").replace(/\&/g, "%26");
    };
    search = new AlgoliaResults("search-results", {
      onClickShowMore: sinon.spy(),
      getParams: () => {
        return { from: "global-search" };
      }
    });
  });

  describe("renderGroup", () => {
    describe("for drupal results", () => {
      it("handles file types", () => {
        const hit = {
          search_api_datasource: "entity:file",
          file_name_raw: "pre_file-file-name",
          _file_uri: "public://file-url",
          _highlightResult: {
            file_name_raw: {
              value: "file-file-name"
            }
          }
        };

        const results = search._renderGroup(
          {
            drupal: {
              nbHits: 1,
              hits: [hit]
            }
          },
          "drupal"
        );

        expect(results).to.be.a("string");
        expect(results).to.have.string(
          hit._highlightResult.file_name_raw.value
        );
        expect(results).to.have.string("/sites/default/files/file-url");
      });

      it("handles search_result", () => {
        const hit = {
          _content_type: "search_result",
          search_api_datasource: "no_file",
          content_title: "pre_search-results-content-title",
          search_result_title: "pre_search-results-title",
          _search_result_url: "file-url",
          _highlightResult: {
            content_title: {
              value: "search-results-content-title"
            },
            search_result_title: {
              value: "search-results-title"
            }
          }
        };
        const results = search._renderGroup(
          {
            drupal: {
              nbHits: 1,
              hits: [hit]
            }
          },
          "drupal"
        );

        expect(results).to.be.a("string");
        expect(results).to.have.string(
          hit._highlightResult.search_result_title.value
        );
        expect(results).to.have.string(hit._search_result_url);
      });

      it("handles other result types", () => {
        const hit = {
          _content_type: "other",
          search_api_datasource: "no_file",
          content_title: "pre_content-title",
          _content_url: "file-url",
          _highlightResult: {
            content_title: {
              value: "content-title"
            }
          }
        };

        const results = search._renderGroup(
          {
            drupal: {
              nbHits: 1,
              hits: [hit]
            }
          },
          "drupal"
        );

        expect(results).to.be.a("string");
        expect(results).to.have.string(
          hit._highlightResult.content_title.value
        );
        expect(results).to.have.string(hit._content_url);
      });
    });
    describe("for stop results", () => {
      it("properly maps icon, url, title and feature icons", () => {
        const hit = {
          stop: {
            id: "stop-id",
            name: "pre_stop-name",
            "station?": true
          },
          _highlightResult: {
            stop: {
              name: {
                value: "stop-name"
              }
            }
          },
          zone: 8,
          green_line_branches: [],
          features: ["bus", "Green-B"]
        };

        const result = search._renderGroup(
          {
            stops: {
              nbHits: 1,
              hits: [hit]
            }
          },
          "stops"
        );

        expect(result).to.be.a("string");
        expect(result).to.have.string("/stops/" + hit.stop.id);
        expect(result).to.have.string(hit._highlightResult.stop.name.value);
        expect(result).to.have.string("green-line-b-icon");
        expect(result).to.have.string("bus-icon");
        expect(result).to.have.string("Zone 8");
      });
    });
    describe("for route results", () => {
      it("properly maps icon, url and title for commuter rail", () => {
        const hit = {
          route: {
            id: "CR-Fitchburg",
            type: 2,
            name: "pre_Fitchburg Line"
          },
          _highlightResult: {
            route: {
              name: {
                value: "Fitchburg Line"
              }
            }
          }
        };

        const result = search._renderGroup(
          {
            routes: {
              nbHits: 1,
              hits: [hit]
            }
          },
          "routes"
        );

        expect(result).to.be.a("string");
        expect(result).to.have.string("/schedules/" + hit.route.id);
        expect(result).to.have.string(hit._highlightResult.route.name.value);
        expect(result).to.have.string("commuter-rail-icon");
      });

      it("properly maps icon, url and title for subway", () => {
        const hit = {
          route: {
            id: "Orange",
            type: 1,
            name: "pre_Orange Line"
          },
          _highlightResult: {
            route: {
              name: {
                value: "Orange Line"
              }
            }
          }
        };

        const result = search._renderGroup(
          {
            routes: {
              nbHits: 1,
              hits: [hit]
            }
          },
          "routes"
        );

        expect(result).to.be.a("string");
        expect(result).to.have.string("/schedules/" + hit.route.id);
        expect(result).to.have.string(hit._highlightResult.route.name.value);
        expect(result).to.have.string("orange-line-icon");
      });
    });
  });

  describe("render", () => {
    var $;

    beforeEach(() => {
      $ = jsdom.rerequire("jquery");
      $("body").append(`
        <div id="icon-feature-bus">bus-icon</div>
        <div id="icon-feature-stop">stop-icon</div>
        <div id="search-results"></div>
      `);
    });

    it("renders empty HTML when no hits", () => {
      const results = {
        stops: {
          hits: []
        },
        routes: {
          hits: []
        },
        projects: {
          hits: []
        },
        pages: {
          hits: []
        },
        documents: {
          hits: []
        }
      };
      search.render(results);

      const sections = document.getElementsByClassName(
        "c-search-results__section"
      );
      const hits = document.getElementsByClassName("c-search-result__hit");
      assert.lengthOf(sections, 5);
      assert.lengthOf(hits, 0);
    });

    it("renders stops hits", () => {
      const results = {
        stops: {
          title: "title",
          nbHits: 2,
          hasHits: true,
          hits: [
            {
              hitUrl: "url1",
              hitIcon: "icon1",
              hitTitle: "title1",
              stop: {
                id: "id1",
                name: "name1",
                "station?": true
              },
              _highlightResult: {
                stop: {
                  name: {
                    value: "name1"
                  }
                }
              },
              green_line_branches: [],
              features: []
            },
            {
              hitUrl: "url2",
              hitIcon: "icon2",
              hitTitle: "title2",
              stop: {
                id: "id2",
                name: "name2",
                "station?": true
              },
              _highlightResult: {
                stop: {
                  name: {
                    value: "name2"
                  }
                }
              },
              green_line_branches: [],
              features: []
            }
          ]
        },
        routes: {
          hits: []
        },
        projects: {
          hits: []
        },
        pages: {
          hits: []
        },
        documents: {
          hits: []
        }
      };
      search.render(results);

      const sections = document.getElementsByClassName(
        "c-search-results__section"
      );
      const hits = document.getElementsByClassName("c-search-result__hit");
      assert.lengthOf(sections, 5);
      assert.lengthOf(hits, 2);
    });

    it("renders routes hits", () => {
      const results = {
        routes: {
          title: "title",
          nbHits: 2,
          hasHits: true,
          hits: [
            {
              hitUrl: "url1",
              hitIcon: "icon1",
              hitTitle: "title1",
              route: {
                type: 3,
                id: "id1",
                name: "name1"
              },
              _highlightResult: {
                route: {
                  name: {
                    value: "name1"
                  },
                  long_name: {
                    value: "long_name1"
                  }
                }
              }
            },
            {
              hitUrl: "url2",
              hitIcon: "icon2",
              hitTitle: "title2",
              route: {
                type: 3,
                id: "id2",
                name: "name2"
              },
              _highlightResult: {
                route: {
                  name: {
                    value: "name2"
                  },
                  long_name: {
                    value: "long_name1"
                  }
                }
              }
            }
          ]
        },
        stops: {
          hits: []
        },
        projects: {
          hits: []
        },
        pages: {
          hits: []
        },
        documents: {
          hits: []
        }
      };
      search.render(results);

      const sections = document.getElementsByClassName(
        "c-search-results__section"
      );
      const hits = document.getElementsByClassName("c-search-result__hit");
      assert.lengthOf(sections, 5);
      assert.lengthOf(hits, 2);
    });

    it("renders content hits", () => {
      const results = {
        projects: {
          hits: []
        },
        pages: {
          title: "title",
          nbHits: 2,
          hasHits: true,
          hits: [
            {
              hitUrl: "url1",
              hitIcon: "icon1",
              hitTitle: "title1",
              _highlightResult: {
                content_title: {
                  value: "title1"
                }
              }
            },
            {
              hitUrl: "url2",
              hitIcon: "icon2",
              hitTitle: "title2",
              _highlightResult: {
                content_title: {
                  value: "title1"
                }
              }
            }
          ]
        },
        stops: {
          hits: []
        },
        routes: {
          hits: []
        }
      };
      search.render(results);

      const sections = document.getElementsByClassName(
        "c-search-results__section"
      );
      const hits = document.getElementsByClassName("c-search-result__hit");
      assert.lengthOf(sections, 4);
      assert.lengthOf(hits, 2);
    });
  });

  describe("onClickResultCallback", () => {
    it("updates the href with parameters", () => {
      const target = document.createElement("a");
      search.onClickResultCallback("/link")({});
      expect(window.location.assign.args[0][0]).to.equal(
        "/link?from=global-search"
      );
    });
  });

  describe("_showLocation", () => {
    it("adds query parameters for analytics", () => {
      // eslint-disable-next-line no-underscore-dangle
      search._showLocation("42.0", "-71.0", "10 Park Plaza, Boston, MA");
      expect(window.location.assign.called).to.equal(true);
      expect(window.location.assign.args[0][0]).to.contain(
        "from=global-search"
      );
      expect(window.location.assign.args[0][0]).to.contain("latitude=42.0");
      expect(window.location.assign.args[0][0]).to.contain("longitude=-71.0");
      expect(window.location.assign.args[0][0]).to.contain(
        "address=10%20Park%20Plaza,%20Boston,%20MA"
      );
    });
  });
});

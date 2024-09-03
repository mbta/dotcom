import jsdom from "mocha-jsdom";
import { expect, assert } from "chai";
import * as AlgoliaResult from "../algolia-result";
import testConfig from "../../ts/jest.config";

const { testURL } = testConfig;
/* eslint-disable no-underscore-dangle */

describe("AlgoliaResult", () => {
  const drupalHits = {
    searchResult: {
      _content_type: "search_result",
      _search_result_url: "internal:/search/result",
      content_title: "Search Result Content Title",
      search_result_title: "Search Result Title",
      _highlightResult: {
        content_title: {
          value: "Search Result Content Title"
        },
        search_result_title: {
          value: "Search Result Title"
        }
      }
    },
    newsEntry: {
      _content_type: "news_entry",
      _content_url: "/news/2018-03-30/entry",
      content_title: "News Entry Title",
      _highlightResult: {
        content_title: {
          value: "News Entry Title"
        }
      }
    },
    event: {
      _content_type: "event",
      _content_url: "/events/2018-03-29/event",
      content_title: "Event Title",
      _highlightResult: {
        content_title: {
          value: "Event Title"
        }
      }
    },
    project: {
      _content_type: "project",
      _content_url: "/projects/project",
      content_title: "Project Title",
      _highlightResult: {
        content_title: {
          value: "Project Title"
        }
      }
    },
    page: {
      _content_type: "page",
      _content_url: "/pages/page",
      content_title: "Page Title",
      _highlightResult: {
        content_title: {
          value: "Page Title"
        }
      }
    },
    landingPage: {
      _content_type: "landing_page",
      _content_url: "/landing_page",
      content_title: "Landing Page Title",
      _highlightResult: {
        content_title: {
          value: "Landing Page Title"
        }
      }
    },
    diversion: {
      _content_type: "diversion",
      _content_url: "/diversions/diversion-1",
      content_title: "Diversion Title",
      _highlightResult: {
        content_title: {
          value: "Diversion Title"
        }
      }
    },
    person: {
      _content_type: "person",
      _content_url: "/people/person",
      content_title: "Person Name",
      _highlightResult: {
        content_title: {
          value: "Person Name"
        }
      }
    },
    other: {
      _content_type: "random_type",
      _content_url: "/other/page",
      content_title: "Other Title",
      _highlightResult: {
        content_title: {
          value: "Other Title"
        }
      }
    },
    pdf: {
      search_api_datasource: "entity:file",
      _file_type: "application/pdf",
      _file_uri: "public://pdf.pdf",
      content_title: "PDF Title",
      file_name_raw: "PDF file name",
      _highlightResult: {
        content_title: {
          value: "PDF Title"
        },
        file_name_raw: {
          value: "PDF file name"
        }
      }
    },
    excel: {
      search_api_datasource: "entity:file",
      _file_type: "application/vnd.ms-excel",
      _file_uri: "public://excel.exs",
      content_title: "Excel Title",
      file_name_raw: "Excel file name",
      _highlightResult: {
        content_title: {
          value: "Excel Title"
        },
        file_name_raw: {
          value: "Excel file name"
        }
      }
    },
    powerpoint: {
      search_api_datasource: "entity:file",
      _file_type:
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      _file_uri: "public://powerpoint.ppt",
      content_title: "Powerpoint Title",
      file_name_raw: "Powerpoint file name",
      _highlightResult: {
        content_title: {
          value: "Powerpoint Title"
        },
        file_name_raw: {
          value: "Powerpoint file name"
        }
      }
    },
    unrecognizedFileType: {
      search_api_datasource: "entity:file",
      _file_type: "application/unrecognized",
      _file_uri: "public://file.file",
      content_title: "Unrecognized File Title",
      file_name_raw: "Unrecognized file name",
      _highlightResult: {
        content_title: {
          value: "Unrecognized File Title"
        },
        file_name_raw: {
          value: "Unrecognized file name"
        }
      }
    }
  };
  const locationHits = {
    bostonCommon: {
      street_address: "Boston Common, Tremont Street, Boston, MA, USA",
      highlighted_spans: [
        { length: 2, offset: 3 },
        { length: 5, offset: 9 }
      ]
    }
  };
  const routeHits = {
    commuterRail: {
      route: {
        id: "CR-Fitchburg",
        name: "Fitchburg Line",
        type: 2
      },
      _highlightResult: {
        route: {
          name: {
            value: "Fitchburg Line"
          }
        }
      }
    },
    bus: {
      route: {
        id: "93",
        name: "93e",
        type: 3
      },
      _highlightResult: {
        route: {
          name: {
            value: "93e"
          }
        }
      }
    },
    ferry: {
      route: {
        id: "Boat-F4",
        name: "Charlestown Ferry",
        type: 4
      },
      _highlightResult: {
        route: {
          name: {
            value: "Charlestown Ferry"
          }
        }
      }
    },
    redLine: {
      route: {
        id: "Red",
        name: "Red Line",
        type: 1
      },
      _highlightResult: {
        route: {
          name: {
            value: "Red Line"
          }
        }
      }
    },
    blueLine: {
      route: {
        id: "Blue",
        name: "Blue Line",
        type: 1
      },
      _highlightResult: {
        route: {
          name: {
            value: "Blue Line"
          }
        }
      }
    },
    orangeLine: {
      route: {
        id: "Orange",
        name: "Orange Line",
        type: 1
      },
      _highlightResult: {
        route: {
          name: {
            value: "Orange Line"
          }
        }
      }
    },
    greenLineC: {
      route: {
        id: "Green-C",
        name: "Green Line C Branch",
        type: 0
      },
      _highlightResult: {
        route: {
          name: {
            value: "Green Line C Branch"
          }
        }
      }
    },
    mattapan: {
      route: {
        id: "Mattapan",
        name: "Mattapan Trolley",
        type: 0
      },
      _highlightResult: {
        route: {
          name: {
            value: "Mattapan Trolley"
          }
        }
      }
    }
  };
  const stopHits = {
    northStation: {
      stop: {
        id: "place-north",
        name: "North Station",
        routes: [
          routeHits.greenLineC.route,
          routeHits.orangeLine.route,
          routeHits.commuterRail.route
        ]
      },
      _highlightResult: {
        stop: {
          name: {
            value: "North Station"
          }
        }
      }
    },
    busStop: {
      stop: {
        id: "place-bus",
        name: "Bus Stop",
        routes: [{ name: "Bus Route", id: "bus-route", type: 3 }]
      },
      _highlightResult: {
        stop: {
          name: {
            value: "Bus Stop"
          }
        }
      }
    }
  };

  const projectHits = {
    bus: {
      related_transit_gtfs_id: "1",
      related_transit_gtfs_ancestry: "bus"
    },
    subway: {
      related_transit_gtfs_id: ["Red", "Orange", "Green-B", "Green-C", "Green"],
      related_transit_gtfs_ancestry: [
        "Subway",
        "Subway",
        "Green",
        "Subway",
        "Green",
        "Subway",
        "Subway"
      ]
    },
    green: {
      related_transit_gtfs_id: "Green",
      related_transit_gtfs_ancestry: "Subway"
    },
    red: {
      related_transit_gtfs_id: "Red",
      related_transit_gtfs_ancestry: "Subway"
    },
    cr: {
      related_transit_gtfs_id: "CR-Lowell",
      related_transit_gtfs_ancestry: "Commuter Rail"
    },
    none: { related_transit_gtfs_id: null, related_transit_gtfs_ancestry: null }
  };

  jsdom({ url: testURL });
  before(() => {
    document.body.innerHTML = `
      <div id="icon-feature-commuter_rail"><span>commuter rail icon</span></div>
      <div id="icon-feature-bus"><span>bus icon</span></div>
      <div id="icon-feature-ferry"><span>ferry icon</span></div>
      <div id="icon-feature-red_line"><span>red line icon</span></div>
      <div id="icon-feature-blue_line"><span>blue line icon</span></div>
      <div id="icon-feature-orange_line"><span>orange line icon</span></div>
      <div id="icon-feature-green_line"><span>green line icon</span></div>
      <div id="icon-feature-green_line_b"><span>green line b icon</span></div>
      <div id="icon-feature-green_line_c"><span>green line C icon</span></div>
      <div id="icon-feature-mattapan_line"><span>mattapan line icon</span></div>
      <div id="icon-feature-stop"><span>stop icon</span></div>
      <div id="icon-feature-station"><span>statiostationon</span></div>
      <div id="icon-feature-alert"><span> icon</span></div>
      <div id="stops-with-alerts" data-stops-with-alerts=""></div>
      <div id="routes-with-alerts" data-routes-with-alerts=""></div>
    `;
  });

  describe("getIcon", () => {
    it("renders correct icon for Drupal results", () => {
      assert.include(
        AlgoliaResult.getIcon(drupalHits.searchResult, "drupal"),
        "<span"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.searchResult, "drupal"),
        "</span>"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.searchResult, "drupal"),
        "fa-info"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.newsEntry, "drupal"),
        "fa-newspaper-o"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.event, "drupal"),
        "fa-calendar"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.project, "drupal"),
        "fa-wrench"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.page, "drupal"),
        "fa-info"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.landingPage, "drupal"),
        "fa-info"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.diversion, "drupal"),
        "fa-info"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.person, "drupal"),
        "fa-user"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.other, "drupal"),
        "fa-info"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.pdf, "drupal"),
        "fa-file-pdf-o"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.excel, "drupal"),
        "fa-file-excel-o"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.powerpoint, "drupal"),
        "fa-file-powerpoint-o"
      );
      assert.include(
        AlgoliaResult.getIcon(drupalHits.unrecognizedFileType, "drupal"),
        "fa-file-o"
      );
    });

    it("renders correct icon for route type", () => {
      expect(AlgoliaResult.getIcon(routeHits.commuterRail, "routes")).to.equal(
        "<span>commuter rail icon</span>"
      );
      expect(AlgoliaResult.getIcon(routeHits.bus, "routes")).to.equal(
        "<span>bus icon</span>"
      );
      assert.equal(
        AlgoliaResult.getIcon(routeHits.ferry, "routes"),
        "<span>ferry icon</span>"
      );
      expect(AlgoliaResult.getIcon(routeHits.redLine, "routes")).to.equal(
        "<span>red line icon</span>"
      );
      expect(AlgoliaResult.getIcon(routeHits.blueLine, "routes")).to.equal(
        "<span>blue line icon</span>"
      );
      expect(AlgoliaResult.getIcon(routeHits.orangeLine, "routes")).to.equal(
        "<span>orange line icon</span>"
      );
      expect(AlgoliaResult.getIcon(routeHits.greenLineC, "routes")).to.equal(
        "<span>green line C icon</span>"
      );
      expect(AlgoliaResult.getIcon(routeHits.mattapan, "routes")).to.equal(
        "<span>mattapan line icon</span>"
      );
    });

    it("renders stop icon for stops", () => {
      expect(AlgoliaResult.getIcon(stopHits.northStation, "stops")).to.equal(
        "<span>stop icon</span>"
      );
      expect(AlgoliaResult.getIcon(stopHits.busStop, "stops")).to.equal(
        "<span>stop icon</span>"
      );
    });

    it("renders correct icon for Drupal results for project searches", () => {
      assert.include(AlgoliaResult.getIcon(projectHits.none, "projects"), "");
      assert.include(AlgoliaResult.getIcon(projectHits.bus, "projects"), "bus");
      assert.include(
        AlgoliaResult.getIcon(projectHits.red, "projects"),
        "red line"
      );
      assert.include(
        AlgoliaResult.getIcon(projectHits.green, "projects"),
        "green line"
      );
      assert.include(
        AlgoliaResult.getIcon(projectHits.cr, "projects"),
        "commuter rail"
      );
      assert.include(
        AlgoliaResult.getIcon(projectHits.subway, "projects"),
        "green line"
      );
      assert.include(
        AlgoliaResult.getIcon(projectHits.subway, "projects"),
        "red line"
      );
      assert.include(
        AlgoliaResult.getIcon(projectHits.subway, "projects"),
        "orange line"
      );
      assert.include(
        AlgoliaResult.getIcon(projectHits.subway, "projects"),
        "green line b"
      );
      assert.notInclude(
        AlgoliaResult.getIcon(projectHits.subway, "projects"),
        "subway"
      );
    });

    it("renders a map marker icon for locations", () => {
      assert.include(
        AlgoliaResult.getIcon(locationHits.bostonCommon, "locations"),
        "fa-map-marker"
      );
    });
  });

  describe("getTitle", () => {
    describe("for routes", () => {
      it("returns the route name", () => {
        expect(AlgoliaResult.getTitle(routeHits.redLine, "routes")).to.equal(
          "Red Line"
        );
        expect(
          AlgoliaResult.getTitle(routeHits.commuterRail, "routes")
        ).to.equal("Fitchburg Line");
      });
    });

    describe("for locations", () => {
      it("properly highlights search results from locations", () => {
        expect(
          AlgoliaResult.getTitle(locationHits.bostonCommon, "locations")
        ).to.equal(
          "Bos<em>to</em>n Co<em>mmon,</em> Tremont Street, Boston, MA, USA"
        );
      });
    });

    describe("for stops", () => {
      it("returns the stop name", () => {
        expect(AlgoliaResult.getTitle(stopHits.northStation, "stops")).to.equal(
          "North Station"
        );
        expect(AlgoliaResult.getTitle(stopHits.busStop, "stops")).to.equal(
          "Bus Stop"
        );
      });
    });

    describe("for drupal content", () => {
      it("returns file name for files", () => {
        expect(AlgoliaResult.getTitle(drupalHits.pdf, "drupal")).to.equal(
          "PDF file name"
        );
        expect(AlgoliaResult.getTitle(drupalHits.excel, "drupal")).to.equal(
          "Excel file name"
        );
        expect(
          AlgoliaResult.getTitle(drupalHits.powerpoint, "drupal")
        ).to.equal("Powerpoint file name");
        expect(
          AlgoliaResult.getTitle(drupalHits.unrecognizedFileType, "drupal")
        ).to.equal("Unrecognized file name");
      });

      it("returns content title for all other content types", () => {
        expect(
          AlgoliaResult.getTitle(drupalHits.searchResult, "drupal")
        ).to.equal("Search Result Title");
        expect(AlgoliaResult.getTitle(drupalHits.newsEntry, "drupal")).to.equal(
          "News Entry Title"
        );
        expect(AlgoliaResult.getTitle(drupalHits.event, "drupal")).to.equal(
          "Event Title"
        );
        expect(AlgoliaResult.getTitle(drupalHits.project, "drupal")).to.equal(
          "Project Title"
        );
        expect(AlgoliaResult.getTitle(drupalHits.page, "drupal")).to.equal(
          "Page Title"
        );
        expect(
          AlgoliaResult.getTitle(drupalHits.landingPage, "drupal")
        ).to.equal("Landing Page Title");
        expect(AlgoliaResult.getTitle(drupalHits.diversion, "drupal")).to.equal(
          "Diversion Title"
        );
        expect(AlgoliaResult.getTitle(drupalHits.person, "drupal")).to.equal(
          "Person Name"
        );
        expect(AlgoliaResult.getTitle(drupalHits.other, "drupal")).to.equal(
          "Other Title"
        );
      });
    });
  });

  describe("getUrl returns correct URL", () => {
    it("for routes", () => {
      expect(AlgoliaResult.getUrl(routeHits.redLine, "routes")).to.equal(
        "/schedules/Red"
      );
      expect(AlgoliaResult.getUrl(routeHits.greenLineC, "routes")).to.equal(
        "/schedules/Green-C"
      );
    });
    it("for stops", () => {
      expect(AlgoliaResult.getUrl(stopHits.northStation, "stops")).to.equal(
        "/stops/place-north"
      );
      expect(AlgoliaResult.getUrl(stopHits.busStop, "stops")).to.equal(
        "/stops/place-bus"
      );
    });
    it("for drupal content", () => {
      expect(AlgoliaResult.getUrl(drupalHits.searchResult, "drupal")).to.equal(
        "/search/result"
      );
      expect(AlgoliaResult.getUrl(drupalHits.newsEntry, "drupal")).to.equal(
        "/news/2018-03-30/entry"
      );
      expect(AlgoliaResult.getUrl(drupalHits.event, "drupal")).to.equal(
        "/events/2018-03-29/event"
      );
      expect(AlgoliaResult.getUrl(drupalHits.project, "drupal")).to.equal(
        "/projects/project"
      );
      expect(AlgoliaResult.getUrl(drupalHits.page, "drupal")).to.equal(
        "/pages/page"
      );
      expect(AlgoliaResult.getUrl(drupalHits.landingPage, "drupal")).to.equal(
        "/landing_page"
      );
      expect(AlgoliaResult.getUrl(drupalHits.diversion, "drupal")).to.equal(
        "/diversions/diversion-1"
      );
      expect(AlgoliaResult.getUrl(drupalHits.person, "drupal")).to.equal(
        "/people/person"
      );
      expect(AlgoliaResult.getUrl(drupalHits.other, "drupal")).to.equal(
        "/other/page"
      );
    });
  });

  describe("getFeatureIcons returns correct content date", () => {
    it("for news", () => {
      expect(
        AlgoliaResult.getFeatureIcons(drupalHits.newsEntry, "news")[0]
      ).to.contain(["Mar 30, 2018"]);
    });
    it("for news", () => {
      expect(
        AlgoliaResult.getFeatureIcons(drupalHits.event, "events")[0]
      ).to.contain(["Mar 29, 2018"]);
    });
  });
});

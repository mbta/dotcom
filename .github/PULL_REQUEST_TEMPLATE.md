<!-- 
  GitHub will automatically add a random non-busy member of the Dotcom team
  as a Required Reviewer when the PR is opened; feel free to also manually assign
  team members if a PR needs a very specific pair of eyes! -->

#### Summary of changes

<!-- Link to relevant Asana task; remove if not applicable -->
**Asana Ticket:** [TICKET_NAME](TICKET_LINK)

<!-- 
  Please include a brief description of what was changed. 
  For UI changes, screenshots are encouraged.
  - What does it accomplish/fix?
  - What thinking went into it?
  - What were the potential hurdles, and how were they overcome?
  - What remaining questions need to be answered, if any?
-->

---

#### General checks
* [ ] **Are the changes organized into self-contained commits with descriptive and well-formatted commit messages?** This is a good practice that can facilitate easier reviews.
* [ ] **Testing.** Do the changes include relevant passing updates to tests? This includes updating screenshots. Preferably tests are run locally to verify that there are no test failures created by these changes, before opening a PR.
* [ ] **Tech debt.** Have you checked for tech debt you can address in the area you're working in? This can be a good time to address small issues, or create Asana tickets for larger issues.

<!-- More specialized checks below, remove sections that are not applicable -->

#### New UI, or substantial UI changes
* [ ] **Cross-browser compatibility** is less of an issue now that we're no longer supporting IE, but changes still need to work as expected in Safari, Chrome, and Firefox.
* [ ] **Are interactive elements accessible?** This includes at minimum having [relevant keyboard interactions](https://thinkdobecreate.com/articles/4-required-tests-before-shipping-new-features/#keyboard-interaction) and [visible focus](https://thinkdobecreate.com/articles/4-required-tests-before-shipping-new-features/#visible-focus), but can also include verification with screen reader testing.
* [ ] **Other accessibility checks** such as sufficient [color constrast](https://thinkdobecreate.com/articles/4-required-tests-before-shipping-new-features/#color-contrast), or whether the layout holds up at 200% [zoom level](https://thinkdobecreate.com/articles/4-required-tests-before-shipping-new-features/#visible-focus).

#### New endpoints, or non-trivial changes to current endpoints
* [ ] **Have we load-tested** any new pages or internal API endpoints that will receive significant traffic? [See load testing docs](./../apps/site/load_tests/README.md)
* [ ] **If this change involves routes,** does it work correctly with pertinent "unusual" routes such as the combined Green Line, Silver Line, Foxboro commuter rail, and single-direction bus routes like the 170?


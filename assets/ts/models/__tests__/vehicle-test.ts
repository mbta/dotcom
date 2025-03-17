import { crowdingDescriptions } from "../vehicle";

it.each`
  crowding           | description
  ${"not_crowded"}   | ${"Not crowded"}
  ${"some_crowding"} | ${"Some crowding"}
  ${"crowded"}       | ${"Crowded"}
  ${null}            | ${""}
`("crowdingDescriptions for $crowding", ({ crowding, description }) => {
  expect(crowdingDescriptions(crowding)).toBe(description);
});

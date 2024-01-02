import { crowdingDescriptions, crCrowdingDescriptions } from "../vehicle";

it.each`
  crowding           | description
  ${"not_crowded"}   | ${"Not crowded"}
  ${"some_crowding"} | ${"Some crowding"}
  ${"crowded"}       | ${"Crowded"}
  ${null}            | ${""}
`("crowdingDescriptions for $crowding", ({ crowding, description }) => {
  expect(crowdingDescriptions(crowding)).toBe(description);
});

it.each`
  crowding           | description
  ${"not_crowded"}   | ${"many seats available"}
  ${"some_crowding"} | ${"some seats available"}
  ${"crowded"}       | ${"few seats available"}
  ${null}            | ${""}
`("crCrowdingDescriptions for $crowding", ({ crowding, description }) => {
  expect(crCrowdingDescriptions(crowding)).toBe(description);
});

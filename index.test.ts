import { rocketPipe } from ".";
import { Either } from "monet";

describe("Rocket pipes tests", () => {
  it("Simple test", async () => {
    const resp = await rocketPipe(
      () => 123,
      (n) => n + 1
    )();
    expect(resp).toEqual(124);
  });

  it("Promise pass test", async () => {
    const resp = await rocketPipe(
      () => Promise.resolve(123),
      (n) => n + 1
    )();
    expect(resp).toEqual(124);
  });

  it("Either right pass test", async () => {
    const resp = await rocketPipe(
      () => Either.right(123),
      (n) => n + 1
    )();
    expect(resp).toEqual(124);
  });

  it("Either right in promise pass test", async () => {
    const resp = await rocketPipe(
      () => Promise.resolve(Either.right(123)),
      (n) => n + 1
    )();
    expect(resp).toEqual(124);
  });
});

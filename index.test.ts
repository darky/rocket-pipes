import { rocketPipe } from ".";
import { Either } from "monet";

describe("Rocket pipes tests", () => {
  describe("Simple", () => {
    it("Simple pass test", async () => {
      const resp = await rocketPipe(
        () => 123,
        (n) => n + 1
      )();
      expect(resp).toEqual(124);
    });

    it("Simple error test", async () => {
      expect(
        rocketPipe(
          async () => {
            throw new Error("qwe");
          },
          (n) => n + 1
        )()
      ).rejects.toEqual("qwe");
    });
  });

  describe("Promise", () => {
    it("Promise pass test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(123),
        (n) => n + 1
      )();
      expect(resp).toEqual(124);
    });

    it("Promise reject test", async () => {
      expect(
        rocketPipe(
          () => Promise.reject(123),
          (n) => "qwe"
        )()
      ).rejects.toEqual(123);
    });
  });

  describe("Monet", () => {
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

    it("Either left test", async () => {
      const resp = await rocketPipe(
        () => Either.left(123),
        (_, l) => l + 1
      )();
      expect(resp).toEqual(124);
    });

    it("Either left in promise test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Either.left(123)),
        (_, l) => l + 1
      )();
      expect(resp).toEqual(124);
    });
  });
});

import { rocketPipe } from "./index";
import { Either } from "monet";

describe("Rocket pipes tests", () => {
  describe("Simple", () => {
    it("Simple passthrough test", async () => {
      const resp = await rocketPipe(
        () => 123,
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Simple async error test", async () => {
      expect(
        rocketPipe(
          async () => {
            throw new Error("qwe");
          },
          (n) => n + 1
        )()
      ).rejects.toEqual("qwe");
    });

    it("Simple error test", async () => {
      expect(
        rocketPipe(
          () => {
            throw new Error("qwe");
          },
          (n) => n + 1
        )()
      ).rejects.toEqual("qwe");
    });
  });

  describe("Promise", () => {
    it("Promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
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

  describe("Monet Either", () => {
    it("Either right passthrough test", async () => {
      const resp = await rocketPipe(
        () => Either.right(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either right in promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Either.right(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either right result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Either.left(123)),
        (_, l) => Either.right(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either left test", async () => {
      const resp = await rocketPipe(
        () => Either.left(123),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either left in promise test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Either.left(123)),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either left result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Either.left(123)),
        (_, l) => Either.left(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });
  });
});

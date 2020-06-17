import { rocketPipe, exitPipe } from "./index";
import { Either, Maybe, Validation } from "monet";
import { Either as PurifyEither, Left as PurifyLeft } from "purify-ts";

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

  describe("Utils", () => {
    it("Exit pipeline", async () => {
      const resp = await rocketPipe(
        () => 123,
        (n) => exitPipe(n + 1),
        (n) => "qwe"
      )();
      expect(<number>resp + 1).toEqual(125);
    });

    it("Exit promise pipeline", async () => {
      const resp = await rocketPipe(
        () => 123,
        (n) => Promise.resolve(exitPipe(n + 1)),
        (n) => "qwe"
      )();
      expect(<number>resp + 1).toEqual(125);
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

    it("Promise thenable test", async () => {
      const resp = await rocketPipe(
        () => {
          const obj = { n: 123 };
          return Promise.resolve().then(() => obj);
        },
        (obj) => obj.n + 1
      )();
      expect(resp + 1).toEqual(125);
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

  describe("Monet Maybe", () => {
    it("Maybe some passthrough test", async () => {
      const resp = await rocketPipe(
        () => Maybe.some(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Maybe some in promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Maybe.some(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Maybe some result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Maybe.some(123)),
        (n) => Maybe.some(n + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Maybe none passthrough and result test", async () => {
      const resp = await rocketPipe(
        () => Maybe.none(),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });

    it("Maybe none passthrough in promise test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Maybe.none()),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });
  });

  describe("Monet Validation", () => {
    it("Validation success passthrough test", async () => {
      const resp = await rocketPipe(
        () => Validation.success(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Validation success in promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Validation.success(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Validation success result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Validation.success(123)),
        (n) => Validation.success(n + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Validation fail passthrough test", async () => {
      const resp = await rocketPipe(
        () => Validation.fail(123),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Validation fail in promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Validation.fail(123)),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Validation fail result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(Validation.fail(123)),
        (_, l) => Validation.fail(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });
  });

  describe("Purify TS Either", () => {
    it("Either right passthrough test", async () => {
      const resp = await rocketPipe(
        () => PurifyEither.of(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either right in promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(PurifyEither.of(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either right result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(PurifyLeft(123)),
        (_, l) => PurifyEither.of(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either left test", async () => {
      const resp = await rocketPipe(
        () => PurifyLeft(123),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either left in promise test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(PurifyLeft(123)),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Either left result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(PurifyLeft(123)),
        (_, l) => PurifyLeft(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });
  });
});

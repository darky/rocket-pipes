import { rocketPipe, exitPipe, clearAfterAll, clearBeforeAll, beforeAll as ba, afterAll as aa } from "./index";
import { Either, Maybe, Validation } from "monet";
import { Either as PurifyEither, Left as PurifyLeft, Maybe as PurifyMaybe, EitherAsync, MaybeAsync } from "purify-ts";
import * as R from "ramda";

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

    it("Pass argument test", async () => {
      const resp = await rocketPipe(
        (n: number) => n + 1,
        (n) => n + 1
      )(123);
      expect(resp + 1).toEqual(126);
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

    it("Replace fn on the fly", async () => {
      const fn = rocketPipe(
        () => 123,
        (n) => n + 1
      );
      const resp = await fn.replace([[0, () => 124]])();
      expect(resp + 1).toEqual(126);
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

  describe("AOP", () => {
    afterEach(() => {
      clearAfterAll();
      clearBeforeAll();
    });

    it("beforeAll unknown label", (cb) => {
      ba((label, n) => {
        expect(label).toEqual("unknown");
        expect(n).toEqual(123);
        cb();
      });
      rocketPipe(
        (n: number) => n + 1,
        (n) => n + 1
      )(123);
    });

    it("afterAll unknown label", (cb) => {
      aa((label, n) => {
        expect(label).toEqual("unknown");
        expect(n).toEqual(125);
        cb();
      });
      rocketPipe(
        (n: number) => n + 1,
        (n) => n + 1
      )(123);
    });

    it("beforeAll label", (cb) => {
      ba((label, n) => {
        expect(label).toEqual("test");
        expect(n).toEqual(123);
        cb();
      });
      rocketPipe(
        (n: number) => n + 1,
        (n) => n + 1
      ).label("test")(123);
    });

    it("afterAll label", (cb) => {
      aa((label, n) => {
        expect(label).toEqual("test");
        expect(n).toEqual(125);
        cb();
      });
      rocketPipe(
        (n: number) => n + 1,
        (n) => n + 1
      ).label("test")(123);
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

  describe("Purify Either", () => {
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

  describe("Purify Maybe", () => {
    it("Maybe some passthrough test", async () => {
      const resp = await rocketPipe(
        () => PurifyMaybe.of(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Maybe some in promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(PurifyMaybe.of(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Maybe some result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(PurifyMaybe.of(123)),
        (n) => PurifyMaybe.of(n + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Maybe none passthrough and result test", async () => {
      const resp = await rocketPipe(
        () => PurifyMaybe.zero(),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });

    it("Maybe none passthrough in promise test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(PurifyMaybe.zero()),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });
  });

  describe("Purify EitherAsync", () => {
    it("EitherAsync right passthrough test", async () => {
      const resp = await rocketPipe(
        () => EitherAsync(() => Promise.resolve(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("EitherAsync right in promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(EitherAsync(() => Promise.resolve(123))),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("EitherAsync right result test", async () => {
      const resp = await rocketPipe(
        () =>
          Promise.resolve(
            EitherAsync<number, unknown>(({ liftEither }) => liftEither(PurifyLeft(123)))
          ),
        (_, l) => PurifyEither.of(l + 1)
      )();
      expect(resp + 1).toEqual(125);
    });

    it("EitherAsync left test", async () => {
      const resp = await rocketPipe(
        () => EitherAsync<number, unknown>(({ liftEither }) => liftEither(PurifyLeft(123))),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("EitherAsync left in promise test", async () => {
      const resp = await rocketPipe(
        () =>
          Promise.resolve(
            EitherAsync<number, unknown>(({ liftEither }) => liftEither(PurifyLeft(123)))
          ),
        (_, l) => l + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("EitherAsync left result test", async () => {
      const resp = await rocketPipe(
        () =>
          Promise.resolve(
            EitherAsync<number, unknown>(({ liftEither }) => liftEither(PurifyLeft(123)))
          ),
        (_, l) => EitherAsync<number, unknown>(({ liftEither }) => liftEither(PurifyLeft(l + 1)))
      )();
      expect(resp + 1).toEqual(125);
    });

    it("EitherAsync error test", async () => {
      expect(
        rocketPipe(
          async () => EitherAsync(() => Promise.reject("qwe")),
          (n) => n + 1
        )()
      ).rejects.toEqual("qwe");
    });
  });

  describe("Purify MaybeAsync", () => {
    it("MaybeAsync some passthrough test", async () => {
      const resp = await rocketPipe(
        () => MaybeAsync(() => Promise.resolve(123)),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("MaybeAsync some in promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(MaybeAsync(() => Promise.resolve(123))),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("MaybeAsync some result test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(MaybeAsync(() => Promise.resolve(123))),
        (n) => MaybeAsync(() => Promise.resolve(n + 1))
      )();
      expect(resp + 1).toEqual(125);
    });

    it("MaybeAsync none passthrough and result test", async () => {
      const resp = await rocketPipe(
        () => MaybeAsync(({ liftMaybe }) => liftMaybe(PurifyMaybe.zero())),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });

    it("MaybeAsync none passthrough in promise test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(MaybeAsync(({ liftMaybe }) => liftMaybe(PurifyMaybe.zero()))),
        (s, n) => s || n
      )();
      expect(resp).toEqual(void 0);
    });
  });

  describe("Ramda", () => {
    it("Ramda ifElse", async () => {
      const fn = R.ifElse(
        () => true,
        rocketPipe(
          () => Promise.resolve(123),
          (n) => n + 1
        ),
        rocketPipe(
          () => Promise.resolve(123),
          (n) => n + 1
        )
      ) as () => Promise<number>;
      const resp = await fn();
      expect(resp + 1).toEqual(125);
    });
  });
});

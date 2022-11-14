import { rocketPipe, exitPipe, clearAfterAll, clearBeforeAll, beforeAll as ba, afterAll as aa, isExitPipeValue, p, ep, iep, pipeContext, pc } from "./index";
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
      let error = new Error('unknown');
      try {
        await rocketPipe(
          async () => {
            throw new Error("qwe");
          },
          (n) => n + 1
        )();
      } catch(e) {
        error = e as Error;
      } finally {
        expect(error.message).toEqual('qwe');
      }
    });

    it("Simple error test", async () => {
      let error = new Error('unknown');
      try {
        await rocketPipe(
          () => {
            throw new Error("qwe");
          },
          (n) => n + 1
        )()
      } catch(e) {
        error = e as Error;
      } finally {
        expect(error.message).toEqual('qwe');
      }
    });

    it("Pass argument test", async () => {
      const resp = await rocketPipe(
        (n: number) => n + 1,
        (n) => n + 1
      )(123);
      expect(resp + 1).toEqual(126);
    });
  });

  describe("Exit pipeline", () => {
    it("Exit pipeline", async () => {
      const resp = await rocketPipe(
        () => 123,
        (n) => exitPipe(n + 1),
        (n) => "qwe"
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(125)
      }
    });

    it("Exit promise pipeline", async () => {
      const resp = await rocketPipe(
        () => 123,
        (n) => Promise.resolve(exitPipe(n + 1)),
        (n) => "qwe"
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(125)
      }
    });

    it("Nested exit", async () => {
      const resp = await rocketPipe(
        () => 123,
        rocketPipe(
          (n: number) => n + 1,
          n => exitPipe(n + 1),
          () => true,
        ),
        (n) => "qwe"
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(126)
      }
    });

    it("Nested promise exit", async () => {
      const resp = await rocketPipe(
        () => 123,
        rocketPipe(
          (n: number) => n + 1,
          n => Promise.resolve(exitPipe(n + 1)),
          () => true,
        ),
        (n) => "qwe"
      )();
      expect(isExitPipeValue(resp)).toEqual(true);
      if (isExitPipeValue(resp)) {
        expect(resp.r + 1).toEqual(126)
      }
    });
  });

  describe("Context pipeline", () => {
    it("Context pass simple", async () => {
      const resp = await rocketPipe(
        () => 123,
        pipeContext((ctx: {n: number}) => n => n + ctx.n),
        n => n + 1
      ).context({n: 1})();
      expect(resp + 1).toEqual(126);
    });

    it("Context pass nested", async () => {
      const resp = await rocketPipe(
        () => 123,
        rocketPipe(
          (n: number) => n + 1,
          pipeContext((ctx: {n: number}) => n => n + ctx.n)
        ),
        n => n + 1
      ).context({n: 1})();
      expect(resp + 1).toEqual(127);
    });

    it("Override nested context", async () => {
      const resp = await rocketPipe(
        () => 123,
        rocketPipe(
          (n: number) => n + 1,
          pipeContext((ctx: {n: number}) => n => n + ctx.n)
        ).context({n: 4}),
        n => n + 1
      ).context({n: 1})();
      expect(resp + 1).toEqual(130);
    });

    it("Context not passed case", async () => {
      let error = new Error('unknown');
      try {
        await rocketPipe(
          () => 123,
          pipeContext((ctx: {n: number}) => n => n + ctx.n),
          n => n + 1
        )();
      } catch(e) {
        error = e as Error;
      }
      expect(error).toEqual('context not passed');
    });
  });

  describe("Replace pipeline", () => {
    it("Replace fn on the fly", async () => {
      const fn = rocketPipe(
        () => 123,
        (n) => n + 1
      );
      const resp = await fn.replace([[0, () => 124]])();
      expect(resp + 1).toEqual(126);
    });
  })

  describe("Promise", () => {
    it("Promise passthrough test", async () => {
      const resp = await rocketPipe(
        () => Promise.resolve(123),
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Promise reject test", async () => {
      let error = new Error('unknown');
      try {
        await rocketPipe(
          () => Promise.reject(123),
          (n) => "qwe"
        )();
      } catch(e) {
        error = e as Error;
      }
      expect(error).toEqual(123);
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

    it("beforeAll", (cb) => {
      ba((label, n) => {
        expect(label).toEqual("(n) => n + 1\n(n) => n + 1");
        expect(n).toEqual(123);
        cb();
      });
      rocketPipe(
        (n: number) => n + 1,
        (n) => n + 1
      )(123);
    });

    it("afterAll", (cb) => {
      aa((label, n) => {
        expect(label).toEqual("(n) => n + 1\n(n) => n + 1");
        expect(n).toEqual(125);
        cb();
      });
      rocketPipe(
        (n: number) => n + 1,
        (n) => n + 1
      )(123);
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

  describe('Aliases', () => {
    it("Simple passthrough test", async () => {
      const resp = await p(
        () => 123,
        (n) => n + 1
      )();
      expect(resp + 1).toEqual(125);
    });

    it("Exit pipeline", async () => {
      const resp = await p(
        () => 123,
        (n) => ep(n + 1),
        (n) => "qwe"
      )();
      expect(iep(resp)).toEqual(true);
      if (iep(resp)) {
        expect(resp.r + 1).toEqual(125)
      }
    });

    it("Context pass", async () => {
      const resp = await p(
        () => 123,
        pc((ctx: {n: number}) => n => n + ctx.n),
        n => n + 1
      ).context({n: 1})();
      expect(resp + 1).toEqual(126);
    });
  });
});

import type { Either, Catamorphism } from "monet";
import isPromise from "p-is-promise";
import pipeWith from "@ramda/pipewith";

const isFoldable = <L, R>(x: unknown): x is Either<L, R> =>
  x && typeof (x as Either<L, R>).fold === "function";

const isCata = <L, R>(x: unknown): x is Catamorphism<L, R> =>
  x && typeof (x as Catamorphism<L, R>).cata === "function";

const compose = (fn: Function, res: unknown) => {
  if (isFoldable(res)) {
    return res.fold(
      (l) => l,
      (r) => fn(r)
    );
  }
  if (isCata(res)) {
    return res.cata(
      (l) => l,
      (r) => fn(r)
    );
  }
  return fn(res);
};

export function rocketPipe<T1>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>
): () => Promise<T1>;
export function rocketPipe<V0, T1>(
  fn0: (
    x0: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>
): (x0: V0) => Promise<T1>;
export function rocketPipe<V0, V1, T1>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>
): (x0: V0, x1: V1) => Promise<T1>;
export function rocketPipe<V0, V1, V2, T1>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>
): (x0: V0, x1: V1, x2: V2) => Promise<T1>;

export function rocketPipe<T1, T2>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>
): () => Promise<T2>;
export function rocketPipe<V0, T1, T2>(
  fn0: (
    x0: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>
): (x0: V0) => Promise<T2>;
export function rocketPipe<V0, V1, T1, T2>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>
): (x0: V0, x1: V1) => Promise<T2>;
export function rocketPipe<V0, V1, V2, T1, T2>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>
): (x0: V0, x1: V1, x2: V2) => Promise<T2>;

export function rocketPipe<T1, T2, T3>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>
): () => Promise<T3>;
export function rocketPipe<V0, T1, T2, T3>(
  fn0: (
    x: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>
): (x: V0) => Promise<T3>;
export function rocketPipe<V0, V1, T1, T2, T3>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>
): (x0: V0, x1: V1) => Promise<T3>;
export function rocketPipe<V0, V1, V2, T1, T2, T3>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>
): (x0: V0, x1: V1, x2: V2) => Promise<T3>;

export function rocketPipe<T1, T2, T3, T4>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>
): () => Promise<T4>;
export function rocketPipe<V0, T1, T2, T3, T4>(
  fn0: (
    x: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>
): (x: V0) => Promise<T4>;
export function rocketPipe<V0, V1, T1, T2, T3, T4>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>
): (x0: V0, x1: V1) => Promise<T4>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>
): (x0: V0, x1: V1, x2: V2) => Promise<T4>;

export function rocketPipe<T1, T2, T3, T4, T5>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>
): () => Promise<T5>;
export function rocketPipe<V0, T1, T2, T3, T4, T5>(
  fn0: (
    x: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>
): (x: V0) => Promise<T5>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>
): (x0: V0, x1: V1) => Promise<T5>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>
): (x0: V0, x1: V1, x2: V2) => Promise<T5>;

export function rocketPipe<T1, T2, T3, T4, T5, T6>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>
): () => Promise<T6>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6>(
  fn0: (
    x: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>
): (x: V0) => Promise<T6>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>
): (x0: V0, x1: V1) => Promise<T6>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>
): (x0: V0, x1: V1, x2: V2) => Promise<T6>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>
): () => Promise<T7>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7>(
  fn0: (
    x: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>
): (x: V0) => Promise<T7>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>
): (x0: V0, x1: V1) => Promise<T7>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>
): (x0: V0, x1: V1, x2: V2) => Promise<T7>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>
): () => Promise<T8>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8>(
  fn0: (
    x: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>
): (x: V0) => T8;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>
): (x0: V0, x1: V1) => T8;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>
): (x0: V0, x1: V1, x2: V2) => Promise<T8>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>,
  fn8: (
    x: T8
  ) => T9 | Promise<T9> | Promise<Either<unknown, T9>> | Either<unknown, T9>
): () => Promise<T9>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  fn0: (
    x0: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>,
  fn8: (
    x: T8
  ) => T9 | Promise<T9> | Promise<Either<unknown, T9>> | Either<unknown, T9>
): (x0: V0) => Promise<T9>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>,
  fn8: (
    x: T8
  ) => T9 | Promise<T9> | Promise<Either<unknown, T9>> | Either<unknown, T9>
): (x0: V0, x1: V1) => Promise<T9>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>,
  fn8: (
    x: T8
  ) => T9 | Promise<T9> | Promise<Either<unknown, T9>> | Either<unknown, T9>
): (x0: V0, x1: V1, x2: V2) => Promise<T9>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  fn0: () =>
    | T1
    | Promise<T1>
    | Promise<Either<unknown, T1>>
    | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>,
  fn8: (
    x: T8
  ) => T9 | Promise<T9> | Promise<Either<unknown, T9>> | Either<unknown, T9>,
  fn9: (
    x: T9
  ) => T10 | Promise<T10> | Promise<Either<unknown, T10>> | Either<unknown, T10>
): () => Promise<T10>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  fn0: (
    x0: V0
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>,
  fn8: (
    x: T8
  ) => T9 | Promise<T9> | Promise<Either<unknown, T9>> | Either<unknown, T9>,
  fn9: (
    x: T9
  ) => T10 | Promise<T10> | Promise<Either<unknown, T10>> | Either<unknown, T10>
): (x0: V0) => Promise<T10>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  fn0: (
    x0: V0,
    x1: V1
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>,
  fn8: (
    x: T8
  ) => T9 | Promise<T9> | Promise<Either<unknown, T9>> | Either<unknown, T9>,
  fn9: (
    x: T9
  ) => T10 | Promise<T10> | Promise<Either<unknown, T10>> | Either<unknown, T10>
): (x0: V0, x1: V1) => Promise<T10>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  fn0: (
    x0: V0,
    x1: V1,
    x2: V2
  ) => T1 | Promise<T1> | Promise<Either<unknown, T1>> | Either<unknown, T1>,
  fn1: (
    x: T1
  ) => T2 | Promise<T2> | Promise<Either<unknown, T2>> | Either<unknown, T2>,
  fn2: (
    x: T2
  ) => T3 | Promise<T3> | Promise<Either<unknown, T3>> | Either<unknown, T3>,
  fn3: (
    x: T3
  ) => T4 | Promise<T4> | Promise<Either<unknown, T4>> | Either<unknown, T4>,
  fn4: (
    x: T4
  ) => T5 | Promise<T5> | Promise<Either<unknown, T5>> | Either<unknown, T5>,
  fn5: (
    x: T5
  ) => T6 | Promise<T6> | Promise<Either<unknown, T6>> | Either<unknown, T6>,
  fn6: (
    x: T6
  ) => T7 | Promise<T7> | Promise<Either<unknown, T7>> | Either<unknown, T7>,
  fn7: (
    x: T7
  ) => T8 | Promise<T8> | Promise<Either<unknown, T8>> | Either<unknown, T8>,
  fn8: (
    x: T8
  ) => T9 | Promise<T9> | Promise<Either<unknown, T9>> | Either<unknown, T9>,
  fn9: (
    x: T9
  ) => T10 | Promise<T10> | Promise<Either<unknown, T10>> | Either<unknown, T10>
): (x0: V0, x1: V1, x2: V2) => Promise<T10>;

export function rocketPipe(...fns: Array<Function>) {
  return pipeWith(async (fn, res) => {
    if (isPromise(res)) {
      return res.then((x) => compose(fn, x)).catch(() => res);
    }
    return compose(fn, res);
  }, ...fns);
}

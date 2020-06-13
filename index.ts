import type { Either, Catamorphism, Maybe } from "monet";
import isPromise from "p-is-promise";
import pipeWith from "@ramda/pipewith";

const isFoldable = <L, R>(x: unknown): x is Either<L, R> => x && typeof (x as Either<L, R>).fold === "function";

const isCata = <L, R>(x: unknown): x is Catamorphism<L, R> => x && typeof (x as Catamorphism<L, R>).cata === "function";

const compose = (fn: Function, res: unknown) => {
  if (isCata(res)) {
    return res.cata(
      (l) => fn(null, l),
      (r) => fn(r)
    );
  }
  if (isFoldable(res)) {
    return res.fold(
      (l) => fn(null, l),
      (r) => fn(r)
    );
  }
  return fn(res);
};

export function rocketPipe<T1, L1>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1
): () => Promise<T1 & L1>;
export function rocketPipe<V0, T1, L1>(
  fn0: (x0: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1
): (x0: V0) => Promise<T1 & L1>;
export function rocketPipe<V0, V1, T1, L1>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1
): (x0: V0, x1: V1) => Promise<T1 & L1>;
export function rocketPipe<V0, V1, V2, T1, L1>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1
): (x0: V0, x1: V1, x2: V2) => Promise<T1 & L1>;

export function rocketPipe<T1, T2, L1, L2>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2
): () => Promise<T2 & L2>;
export function rocketPipe<V0, T1, T2, L1, L2>(
  fn0: (x0: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2
): (x0: V0) => Promise<T2 & L2>;
export function rocketPipe<V0, V1, T1, T2, L1, L2>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2
): (x0: V0, x1: V1) => Promise<T2 & L2>;
export function rocketPipe<V0, V1, V2, T1, T2, L1, L2>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2
): (x0: V0, x1: V1, x2: V2) => Promise<T2 & L2>;

export function rocketPipe<T1, T2, T3, L1, L2, L3>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3
): () => Promise<T3 & L3>;
export function rocketPipe<V0, T1, T2, T3, L1, L2, L3>(
  fn0: (x: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3
): (x: V0) => Promise<T3 & L3>;
export function rocketPipe<V0, V1, T1, T2, T3, L1, L2, L3>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3
): (x0: V0, x1: V1) => Promise<T3 & L3>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, L1, L2, L3>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3
): (x0: V0, x1: V1, x2: V2) => Promise<T3 & L3>;

export function rocketPipe<T1, T2, T3, T4, L1, L2, L3, L4>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4
): () => Promise<T4 & L4>;
export function rocketPipe<V0, T1, T2, T3, T4, L1, L2, L3, L4>(
  fn0: (x: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4
): (x: V0) => Promise<T4 & L4>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, L1, L2, L3, L4>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4
): (x0: V0, x1: V1) => Promise<T4 & L4>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, L1, L2, L3, L4>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4
): (x0: V0, x1: V1, x2: V2) => Promise<T4 & L4>;

export function rocketPipe<T1, T2, T3, T4, T5, L1, L2, L3, L4, L5>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5
): () => Promise<T5 & L5>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5>(
  fn0: (x: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5
): (x: V0) => Promise<T5 & L5>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5
): (x0: V0, x1: V1) => Promise<T5 & L5>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5
): (x0: V0, x1: V1, x2: V2) => Promise<T5 & L5>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6
): () => Promise<T6 & L6>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6>(
  fn0: (x: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6
): (x: V0) => Promise<T6 & L6>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6
): (x0: V0, x1: V1) => Promise<T6 & L6>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6
): (x0: V0, x1: V1, x2: V2) => Promise<T6 & L6>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7
): () => Promise<T7 & L7>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7>(
  fn0: (x: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7
): (x: V0) => Promise<T7 & L7>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7
): (x0: V0, x1: V1) => Promise<T7 & L7>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7
): (x0: V0, x1: V1, x2: V2) => Promise<T7 & L7>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8
): () => Promise<T8 & L8>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8>(
  fn0: (x: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8
): (x: V0) => Promise<T8 & L8>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8
): (x0: V0, x1: V1) => Promise<T8 & L8>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8
): (x0: V0, x1: V1, x2: V2) => Promise<T8 & L8>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, L1, L2, L3, L4, L5, L6, L7, L8, L9>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8,
  fn8: (x: T8, l: L8) => Promise<Either<L9, T9>> | Promise<Maybe<T9>> | Promise<T9> | Maybe<T9> | Either<L9, T9> | T9
): () => Promise<T9 & L9>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, L1, L2, L3, L4, L5, L6, L7, L8, L9>(
  fn0: (x0: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8,
  fn8: (x: T8, l: L8) => Promise<Either<L9, T9>> | Promise<Maybe<T9>> | Promise<T9> | Maybe<T9> | Either<L9, T9> | T9
): (x0: V0) => Promise<T9 & L9>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, L1, L2, L3, L4, L5, L6, L7, L8, L9>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8,
  fn8: (x: T8, l: L8) => Promise<Either<L9, T9>> | Promise<Maybe<T9>> | Promise<T9> | Maybe<T9> | Either<L9, T9> | T9
): (x0: V0, x1: V1) => Promise<T9 & L9>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, L1, L2, L3, L4, L5, L6, L7, L8, L9>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8,
  fn8: (x: T8, l: L8) => Promise<Either<L9, T9>> | Promise<Maybe<T9>> | Promise<T9> | Maybe<T9> | Either<L9, T9> | T9
): (x0: V0, x1: V1, x2: V2) => Promise<T9 & L9>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10>(
  fn0: () => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8,
  fn8: (x: T8, l: L8) => Promise<Either<L9, T9>> | Promise<Maybe<T9>> | Promise<T9> | Maybe<T9> | Either<L9, T9> | T9,
  fn9: (x: T9, l: L9) => Promise<Either<L10, T10>> | Promise<Maybe<T10>> | Promise<T10> | Maybe<T10> | Either<L10, T10> | T10
): () => Promise<T10 & L10>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10>(
  fn0: (x0: V0) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8,
  fn8: (x: T8, l: L8) => Promise<Either<L9, T9>> | Promise<Maybe<T9>> | Promise<T9> | Maybe<T9> | Either<L9, T9> | T9,
  fn9: (x: T9, l: L9) => Promise<Either<L10, T10>> | Promise<Maybe<T10>> | Promise<T10> | Maybe<T10> | Either<L10, T10> | T10
): (x0: V0) => Promise<T10 & L10>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10>(
  fn0: (x0: V0, x1: V1) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8,
  fn8: (x: T8, l: L8) => Promise<Either<L9, T9>> | Promise<Maybe<T9>> | Promise<T9> | Maybe<T9> | Either<L9, T9> | T9,
  fn9: (x: T9, l: L9) => Promise<Either<L10, T10>> | Promise<Maybe<T10>> | Promise<T10> | Maybe<T10> | Either<L10, T10> | T10
): (x0: V0, x1: V1) => Promise<T10 & L10>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10>(
  fn0: (x0: V0, x1: V1, x2: V2) => Promise<Either<L1, T1>> | Promise<Maybe<T1>> | Promise<T1> | Maybe<T1> | Either<L1, T1> | T1,
  fn1: (x: T1, l: L1) => Promise<Either<L2, T2>> | Promise<Maybe<T2>> | Promise<T2> | Maybe<T2> | Either<L2, T2> | T2,
  fn2: (x: T2, l: L2) => Promise<Either<L3, T3>> | Promise<Maybe<T3>> | Promise<T3> | Maybe<T3> | Either<L3, T3> | T3,
  fn3: (x: T3, l: L3) => Promise<Either<L4, T4>> | Promise<Maybe<T4>> | Promise<T4> | Maybe<T4> | Either<L4, T4> | T4,
  fn4: (x: T4, l: L4) => Promise<Either<L5, T5>> | Promise<Maybe<T5>> | Promise<T5> | Maybe<T5> | Either<L5, T5> | T5,
  fn5: (x: T5, l: L5) => Promise<Either<L6, T6>> | Promise<Maybe<T6>> | Promise<T6> | Maybe<T6> | Either<L6, T6> | T6,
  fn6: (x: T6, l: L6) => Promise<Either<L7, T7>> | Promise<Maybe<T7>> | Promise<T7> | Maybe<T7> | Either<L7, T7> | T7,
  fn7: (x: T7, l: L7) => Promise<Either<L8, T8>> | Promise<Maybe<T8>> | Promise<T8> | Maybe<T8> | Either<L8, T8> | T8,
  fn8: (x: T8, l: L8) => Promise<Either<L9, T9>> | Promise<Maybe<T9>> | Promise<T9> | Maybe<T9> | Either<L9, T9> | T9,
  fn9: (x: T9, l: L9) => Promise<Either<L10, T10>> | Promise<Maybe<T10>> | Promise<T10> | Maybe<T10> | Either<L10, T10> | T10
): (x0: V0, x1: V1, x2: V2) => Promise<T10 & L10>;

export function rocketPipe(...fns: Array<Function>) {
  return pipeWith(async (fn, res) => (isPromise(res) ? res.then((x) => compose(fn, x)).catch(() => res) : compose(fn, res)), [
    ...fns.map((fn) => async (r: unknown, l: unknown) => fn(r, l)),
    (r: unknown, l: unknown) => r ?? l,
  ]);
}

import type { Either, Catamorphism, Maybe, Validation } from "monet";
import { Either as PurifyEither, Maybe as PurifyMaybe } from "purify-ts";
import isPromise from "p-is-promise";
import pipeWith from "@ramda/pipewith";
import type { Union } from "ts-toolbelt";

type Exists = boolean | string | number | bigint | symbol | void | null | object;

type ExitPipeReturnValue<T> = { x: T };

type FnReturn<T, L, R> =
  | Promise<PurifyEither<L, T> | PurifyMaybe<T> | Either<L, T> | Maybe<T> | ExitPipeReturnValue<R> | Validation<L, T> | T>
  | PurifyMaybe<T>
  | Validation<L, T>
  | Maybe<T>
  | ExitPipeReturnValue<R>
  | Either<L, T>
  | PurifyEither<L, T>
  | T;

const exitPipeReturnValues = new WeakSet();

const isExitPipeReturnValue = <T>(x: unknown): x is ExitPipeReturnValue<T> => exitPipeReturnValues.has(x as object);

const isMonetCata = <L, R>(x: unknown): x is Catamorphism<L, R> =>
  x &&
  typeof (x as Catamorphism<L, R>).cata === "function" &&
  ((typeof (x as Either<L, R>).isLeft === "function" && typeof (x as Either<L, R>).isRight === "function") ||
    (typeof (x as Maybe<R>).isSome === "function" && typeof (x as Maybe<R>).isNone === "function") ||
    (typeof (x as Validation<L, R>).isSuccess === "function" && typeof (x as Validation<L, R>).isFail === "function"));

const isPurifyEither = <L, R>(x: unknown): x is PurifyEither<L, R> =>
  x && typeof (x as PurifyEither<L, R>).either === "function" && typeof (x as PurifyEither<L, R>).isLeft === "function" && typeof (x as PurifyEither<L, R>).isRight === "function";

const isPurifyMaybe = <T>(x: unknown): x is PurifyMaybe<T> =>
  x && typeof (x as PurifyMaybe<T>).caseOf === "function" && typeof (x as PurifyMaybe<T>).isJust === "function" && typeof (x as PurifyMaybe<T>).isNothing === "function";

const compose = (fn: Function, res: unknown) => {
  if (isExitPipeReturnValue(res)) {
    return res.x;
  }
  if (isMonetCata(res)) {
    return res.cata(
      (l) => fn(null, l),
      (r) => fn(r)
    );
  }
  if (isPurifyEither(res)) {
    return res.either(
      (l) => fn(null, l),
      (r) => fn(r)
    );
  }
  if (isPurifyMaybe(res)) {
    return res.caseOf({
      Just: (x) => fn(x),
      Nothing: () => fn(null),
    });
  }
  return fn(res);
};

export function exitPipe<T>(x: T) {
  const exitPipeReturnValue: ExitPipeReturnValue<T> = { x };
  exitPipeReturnValues.add(exitPipeReturnValue);
  return exitPipeReturnValue;
}

export function rocketPipe<T1, L1, R1>(fn0: () => FnReturn<T1, L1, R1>): () => Promise<Union.Select<R1 | L1 | T1, Exists, "extends->">>;
export function rocketPipe<V0, T1, L1, R1>(fn0: (x0: V0) => FnReturn<T1, L1, R1>): (x0: V0) => Promise<Union.Select<R1 | L1 | T1, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, L1, R1>(fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>): (x0: V0, x1: V1) => Promise<Union.Select<R1 | L1 | T1, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, L1, R1>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R1 | L1 | T1, Exists, "extends->">>;

export function rocketPipe<T1, T2, L1, L2, R1, R2>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>
): () => Promise<Union.Select<R2 | R1 | L2 | T2, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>
): (x0: V0) => Promise<Union.Select<R2 | R1 | L2 | T2, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>
): (x0: V0, x1: V1) => Promise<Union.Select<R2 | R1 | L2 | T2, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R2 | R1 | L2 | T2, Exists, "extends->">>;

export function rocketPipe<T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>
): () => Promise<Union.Select<R3 | R2 | R1 | L3 | T3, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>
): (x: V0) => Promise<Union.Select<R3 | R2 | R1 | L3 | T3, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>
): (x0: V0, x1: V1) => Promise<Union.Select<R3 | R2 | R1 | L3 | T3, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R3 | R2 | R1 | L3 | T3, Exists, "extends->">>;

export function rocketPipe<T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>
): () => Promise<Union.Select<R4 | R3 | R2 | R1 | L4 | T4, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>
): (x: V0) => Promise<Union.Select<R4 | R3 | R2 | R1 | L4 | T4, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>
): (x0: V0, x1: V1) => Promise<Union.Select<R4 | R3 | R2 | R1 | L4 | T4, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R4 | R3 | R2 | R1 | L4 | T4, Exists, "extends->">>;

export function rocketPipe<T1, T2, T3, T4, T5, L1, L2, L3, L4, L5, R1, R2, R3, R4, R5>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>
): () => Promise<Union.Select<R5 | R4 | R3 | R2 | R1 | L5 | T5, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5, R1, R2, R3, R4, R5>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>
): (x: V0) => Promise<Union.Select<R5 | R4 | R3 | R2 | R1 | L5 | T5, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5, R1, R2, R3, R4, R5>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>
): (x0: V0, x1: V1) => Promise<Union.Select<R5 | R4 | R3 | R2 | R1 | L5 | T5, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5, R1, R2, R3, R4, R5>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R5 | R4 | R3 | R2 | R1 | L5 | T5, Exists, "extends->">>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6, R1, R2, R3, R4, R5, R6>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>
): () => Promise<Union.Select<R6 | R5 | R4 | R3 | R2 | R1 | L6 | T6, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6, R1, R2, R3, R4, R5, R6>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>
): (x: V0) => Promise<Union.Select<R6 | R5 | R4 | R3 | R2 | R1 | L6 | T6, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6, R1, R2, R3, R4, R5, R6>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>
): (x0: V0, x1: V1) => Promise<Union.Select<R6 | R5 | R4 | R3 | R2 | R1 | L6 | T6, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6, R1, R2, R3, R4, R5, R6>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R6 | R5 | R4 | R3 | R2 | R1 | L6 | T6, Exists, "extends->">>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7, R1, R2, R3, R4, R5, R6, R7>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>
): () => Promise<Union.Select<R7 | R6 | R5 | R4 | R3 | R2 | R1 | L7 | T7, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7, R1, R2, R3, R4, R5, R6, R7>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>
): (x: V0) => Promise<Union.Select<R7 | R6 | R5 | R4 | R3 | R2 | R1 | L7 | T7, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7, R1, R2, R3, R4, R5, R6, R7>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>
): (x0: V0, x1: V1) => Promise<Union.Select<R7 | R6 | R5 | R4 | R3 | R2 | R1 | L7 | T7, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7, R1, R2, R3, R4, R5, R6, R7>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R7 | R6 | R5 | R4 | R3 | R2 | R1 | L7 | T7, Exists, "extends->">>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8, R1, R2, R3, R4, R5, R6, R7, R8>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>
): () => Promise<Union.Select<R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L8 | T8, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8, R1, R2, R3, R4, R5, R6, R7, R8>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>
): (x: V0) => Promise<Union.Select<R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L8 | T8, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8, R1, R2, R3, R4, R5, R6, R7, R8>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>
): (x0: V0, x1: V1) => Promise<Union.Select<R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L8 | T8, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8, R1, R2, R3, R4, R5, R6, R7, R8>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L8 | T8, Exists, "extends->">>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, L1, L2, L3, L4, L5, L6, L7, L8, L9, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => FnReturn<T9, L9, R9>
): () => Promise<Union.Select<R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L9 | T9, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, L1, L2, L3, L4, L5, L6, L7, L8, L9, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  fn0: (x0: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => FnReturn<T9, L9, R9>
): (x0: V0) => Promise<Union.Select<R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L9 | T9, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, L1, L2, L3, L4, L5, L6, L7, L8, L9, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => FnReturn<T9, L9, R9>
): (x0: V0, x1: V1) => Promise<Union.Select<R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L9 | T9, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, L1, L2, L3, L4, L5, L6, L7, L8, L9, R1, R2, R3, R4, R5, R6, R7, R8, R9>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => FnReturn<T9, L9, R9>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L9 | T9, Exists, "extends->">>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => FnReturn<T9, L9, R9>,
  fn9: (x: T9, l: L9) => FnReturn<T10, L10, R10>
): () => Promise<Union.Select<R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L10 | T10, Exists, "extends->">>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  fn0: (x0: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => FnReturn<T9, L9, R9>,
  fn9: (x: T9, l: L9) => FnReturn<T10, L10, R10>
): (x0: V0) => Promise<Union.Select<R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L10 | T10, Exists, "extends->">>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => FnReturn<T9, L9, R9>,
  fn9: (x: T9, l: L9) => FnReturn<T10, L10, R10>
): (x0: V0, x1: V1) => Promise<Union.Select<R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L10 | T10, Exists, "extends->">>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, L1, L2, L3, L4, L5, L6, L7, L8, L9, L10, R1, R2, R3, R4, R5, R6, R7, R8, R9, R10>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>,
  fn8: (x: T8, l: L8) => FnReturn<T9, L9, R9>,
  fn9: (x: T9, l: L9) => FnReturn<T10, L10, R10>
): (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1 | L10 | T10, Exists, "extends->">>;

export function rocketPipe(...fns: Array<Function>) {
  return (...args: unknown[]) =>
    pipeWith(async (fn, res) => (isPromise(res) ? res.then((x) => compose(fn, x)).catch(() => res) : compose(fn, res)), [
      ...fns.map((fn) => async (r: unknown, l: unknown) => fn(r, l)),
      (r: unknown, l: unknown) => r ?? l,
    ])(...args);
}

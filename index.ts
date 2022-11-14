import isPromise from "p-is-promise";
import pipeWith from "@ramda/pipewith";
import type { Union } from "ts-toolbelt";

type Exists = boolean | string | number | bigint | symbol | void | null | object;

export type ExitPipeReturnValue<T> = { r: T };

type FnReturn<T, L, R> =
  | Promise<ExitPipeReturnValue<R> | T>
  | ExitPipeReturnValue<R>
  | T;

type PipeReturn1<FnResult, F1> = FnResult & {
  replace: (r: [0, F1][]) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn2<FnResult, F1, F2> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn3<FnResult, F1, F2, F3> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn4<FnResult, F1, F2, F3, F4> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn5<FnResult, F1, F2, F3, F4, F5> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn6<FnResult, F1, F2, F3, F4, F5, F6> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5] | [5, F6]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn7<FnResult, F1, F2, F3, F4, F5, F6, F7> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5] | [5, F6] | [6, F7]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn8<FnResult, F1, F2, F3, F4, F5, F6, F7, F8> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5] | [5, F6] | [6, F7] | [7, F8]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn9<FnResult, F1, F2, F3, F4, F5, F6, F7, F8, F9> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5] | [5, F6] | [6, F7] | [7, F8] | [8, F9]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type PipeReturn10<FnResult, F1, F2, F3, F4, F5, F6, F7, F8, F9, F10> = FnResult & {
  replace: (r: Array<[0, F1] | [1, F2] | [2, F3] | [3, F4] | [4, F5] | [5, F6] | [6, F7] | [7, F8] | [8, F9] | [9, F10]>) => FnResult;
  context: (ctx: unknown) => FnResult;
};

type ExtractExitPipe1<R1> = (Union.Select<R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R1, Exists, "extends->">>);

type ExtractExitPipe2<R2, R1> = (Union.Select<R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R2 | R1, Exists, "extends->">>);

type ExtractExitPipe3<R3, R2, R1> = (Union.Select<R3 | R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R3 | R2 | R1, Exists, "extends->">>);

type ExtractExitPipe4<R4, R3, R2, R1> = (Union.Select<R4 | R3 | R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R4 | R3 | R2 | R1, Exists, "extends->">>);

type ExtractExitPipe5<R5, R4, R3, R2, R1> = (Union.Select<R5 | R4 | R3 | R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R5 | R4 | R3 | R2 | R1, Exists, "extends->">>);

type ExtractExitPipe6<R6, R5, R4, R3, R2, R1> = (Union.Select<R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->">>);

type ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> = (Union.Select<R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->">>);

type ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> = (Union.Select<R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->">>);

type ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> = (Union.Select<R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->">>);

type ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> = (Union.Select<R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->"> extends never ? never : ExitPipeReturnValue<Union.Select<R10 | R9 | R8 | R7 | R6 | R5 | R4 | R3 | R2 | R1, Exists, "extends->">>);

type AopCallback = (fns: string, ...args: unknown[]) => unknown;

const pipeSymbol = Symbol('rocketPipe');

const pipeContextFns = new WeakSet();
const exitPipeReturnValues = new WeakSet();
const beforeAllFns = new Set<AopCallback>();
const afterAllFns = new Set<AopCallback>();

export const isExitPipeValue = <T>(x: unknown): x is ExitPipeReturnValue<T> => exitPipeReturnValues.has(x as object);

const compose = (fn: Function, res: unknown): unknown => {
  if (isExitPipeValue(res)) {
    return res;
  }
  return fn(res);
};

export function exitPipe<T>(r: T) {
  const exitPipeReturnValue: ExitPipeReturnValue<T> = { r };
  exitPipeReturnValues.add(exitPipeReturnValue);
  return exitPipeReturnValue;
}

export function beforeAll(fn: AopCallback) {
  beforeAllFns.add(fn);
}

export function afterAll(fn: AopCallback) {
  afterAllFns.add(fn);
}

export function clearBeforeAll() {
  beforeAllFns.clear();
}

export function clearAfterAll() {
  afterAllFns.clear();
}

export function pipeContext<T, L, R, C>(fn: (x: C) => (r: T, l: L) => R): (r: T, l: L) => R {
  pipeContextFns.add(fn);
  return fn as unknown as (r: T, l: L) => R;
}

export function rocketPipe<T1, L1, R1>(fn0: () => FnReturn<T1, L1, R1>): PipeReturn1<() => Promise<Union.Select<ExtractExitPipe1<R1> | L1 | T1, Exists, "extends->">>, typeof fn0>;
export function rocketPipe<V0, T1, L1, R1>(fn0: (x0: V0) => FnReturn<T1, L1, R1>): PipeReturn1<(x0: V0) => Promise<Union.Select<ExtractExitPipe1<R1> | L1 | T1, Exists, "extends->">>, typeof fn0>;
export function rocketPipe<V0, V1, T1, L1, R1>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>
): PipeReturn1<(x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe1<R1> | L1 | T1, Exists, "extends->">>, typeof fn0>;
export function rocketPipe<V0, V1, V2, T1, L1, R1>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>
): PipeReturn1<(x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe1<R1> | L1 | T1, Exists, "extends->">>, typeof fn0>;

export function rocketPipe<T1, T2, L1, L2, R1, R2>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>
): PipeReturn2<() => Promise<Union.Select<ExtractExitPipe2<R2, R1> | L2 | T2, Exists, "extends->">>, typeof fn0, typeof fn1>;
export function rocketPipe<V0, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>
): PipeReturn2<(x0: V0) => Promise<Union.Select<ExtractExitPipe2<R2, R1> | L2 | T2, Exists, "extends->">>, typeof fn0, typeof fn1>;
export function rocketPipe<V0, V1, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>
): PipeReturn2<(x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe2<R2, R1> | L2 | T2, Exists, "extends->">>, typeof fn0, typeof fn1>;
export function rocketPipe<V0, V1, V2, T1, T2, L1, L2, R1, R2>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>
): PipeReturn2<(x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe2<R2, R1> | L2 | T2, Exists, "extends->">>, typeof fn0, typeof fn1>;

export function rocketPipe<T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>
): PipeReturn3<() => Promise<Union.Select<ExtractExitPipe3<R3, R2, R1> | L3 | T3, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2>;
export function rocketPipe<V0, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>
): PipeReturn3<(x: V0) => Promise<Union.Select<ExtractExitPipe3<R3, R2, R1> | L3 | T3, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2>;
export function rocketPipe<V0, V1, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>
): PipeReturn3<(x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe3<R3, R2, R1> | L3 | T3, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, L1, L2, L3, R1, R2, R3>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>
): PipeReturn3<(x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe3<R3, R2, R1> | L3 | T3, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2>;

export function rocketPipe<T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>
): PipeReturn4<() => Promise<Union.Select<ExtractExitPipe4<R4, R3, R2, R1> | L4 | T4, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2, typeof fn3>;
export function rocketPipe<V0, T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>
): PipeReturn4<(x: V0) => Promise<Union.Select<ExtractExitPipe4<R4, R3, R2, R1> | L4 | T4, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2, typeof fn3>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>
): PipeReturn4<(x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe4<R4, R3, R2, R1> | L4 | T4, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2, typeof fn3>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, L1, L2, L3, L4, R1, R2, R3, R4>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>
): PipeReturn4<(x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe4<R4, R3, R2, R1> | L4 | T4, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2, typeof fn3>;

export function rocketPipe<T1, T2, T3, T4, T5, L1, L2, L3, L4, L5, R1, R2, R3, R4, R5>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>
): PipeReturn5<() => Promise<Union.Select<ExtractExitPipe5<R5, R4, R3, R2, R1> | L5 | T5, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2, typeof fn3, typeof fn4>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5, R1, R2, R3, R4, R5>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>
): PipeReturn5<(x: V0) => Promise<Union.Select<ExtractExitPipe5<R5, R4, R3, R2, R1> | L5 | T5, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2, typeof fn3, typeof fn4>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5, R1, R2, R3, R4, R5>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>
): PipeReturn5<(x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe5<R5, R4, R3, R2, R1> | L5 | T5, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2, typeof fn3, typeof fn4>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, L1, L2, L3, L4, L5, R1, R2, R3, R4, R5>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>
): PipeReturn5<
  (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe5<R5, R4, R3, R2, R1> | L5 | T5, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4
>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6, R1, R2, R3, R4, R5, R6>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>
): PipeReturn6<() => Promise<Union.Select<ExtractExitPipe6<R6, R5, R4, R3, R2, R1> | L6 | T6, Exists, "extends->">>, typeof fn0, typeof fn1, typeof fn2, typeof fn3, typeof fn4, typeof fn5>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6, R1, R2, R3, R4, R5, R6>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>
): PipeReturn6<
  (x: V0) => Promise<Union.Select<ExtractExitPipe6<R6, R5, R4, R3, R2, R1> | L6 | T6, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5
>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6, R1, R2, R3, R4, R5, R6>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>
): PipeReturn6<
  (x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe6<R6, R5, R4, R3, R2, R1> | L6 | T6, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5
>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, L1, L2, L3, L4, L5, L6, R1, R2, R3, R4, R5, R6>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>
): PipeReturn6<
  (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe6<R6, R5, R4, R3, R2, R1> | L6 | T6, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5
>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7, R1, R2, R3, R4, R5, R6, R7>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>
): PipeReturn7<
  () => Promise<Union.Select<ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> | L7 | T7, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6
>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7, R1, R2, R3, R4, R5, R6, R7>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>
): PipeReturn7<
  (x: V0) => Promise<Union.Select<ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> | L7 | T7, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6
>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7, R1, R2, R3, R4, R5, R6, R7>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>
): PipeReturn7<
  (x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> | L7 | T7, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6
>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, L1, L2, L3, L4, L5, L6, L7, R1, R2, R3, R4, R5, R6, R7>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>
): PipeReturn7<
  (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe7<R7, R6, R5, R4, R3, R2, R1> | L7 | T7, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6
>;

export function rocketPipe<T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8, R1, R2, R3, R4, R5, R6, R7, R8>(
  fn0: () => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>
): PipeReturn8<
  () => Promise<Union.Select<ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> | L8 | T8, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7
>;
export function rocketPipe<V0, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8, R1, R2, R3, R4, R5, R6, R7, R8>(
  fn0: (x: V0) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>
): PipeReturn8<
  (x: V0) => Promise<Union.Select<ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> | L8 | T8, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7
>;
export function rocketPipe<V0, V1, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8, R1, R2, R3, R4, R5, R6, R7, R8>(
  fn0: (x0: V0, x1: V1) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>
): PipeReturn8<
  (x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> | L8 | T8, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7
>;
export function rocketPipe<V0, V1, V2, T1, T2, T3, T4, T5, T6, T7, T8, L1, L2, L3, L4, L5, L6, L7, L8, R1, R2, R3, R4, R5, R6, R7, R8>(
  fn0: (x0: V0, x1: V1, x2: V2) => FnReturn<T1, L1, R1>,
  fn1: (x: T1, l: L1) => FnReturn<T2, L2, R2>,
  fn2: (x: T2, l: L2) => FnReturn<T3, L3, R3>,
  fn3: (x: T3, l: L3) => FnReturn<T4, L4, R4>,
  fn4: (x: T4, l: L4) => FnReturn<T5, L5, R5>,
  fn5: (x: T5, l: L5) => FnReturn<T6, L6, R6>,
  fn6: (x: T6, l: L6) => FnReturn<T7, L7, R7>,
  fn7: (x: T7, l: L7) => FnReturn<T8, L8, R8>
): PipeReturn8<
  (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe8<R8, R7, R6, R5, R4, R3, R2, R1> | L8 | T8, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7
>;

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
): PipeReturn9<
  () => Promise<Union.Select<ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> | L9 | T9, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8
>;
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
): PipeReturn9<
  (x0: V0) => Promise<Union.Select<ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> | L9 | T9, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8
>;
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
): PipeReturn9<
  (x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> | L9 | T9, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8
>;
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
): PipeReturn9<
  (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe9<R9, R8, R7, R6, R5, R4, R3, R2, R1> | L9 | T9, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8
>;

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
): PipeReturn10<
  () => Promise<Union.Select<ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> | L10 | T10, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8,
  typeof fn9
>;
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
): PipeReturn10<
  (x0: V0) => Promise<Union.Select<ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> | L10 | T10, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8,
  typeof fn9
>;
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
): PipeReturn10<
  (x0: V0, x1: V1) => Promise<Union.Select<ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> | L10 | T10, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8,
  typeof fn9
>;
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
): PipeReturn10<
  (x0: V0, x1: V1, x2: V2) => Promise<Union.Select<ExtractExitPipe10<R10, R9, R8, R7, R6, R5, R4, R3, R2, R1> | L10 | T10, Exists, "extends->">>,
  typeof fn0,
  typeof fn1,
  typeof fn2,
  typeof fn3,
  typeof fn4,
  typeof fn5,
  typeof fn6,
  typeof fn7,
  typeof fn8,
  typeof fn9
>;

export function rocketPipe(...functions: Array<Function>): (...args: unknown[]) => unknown {
  const fns = Array.from(functions);
  const fnsStr = fns.map(fn => fn.toString()).join('\n');

  const rpFn = async (...args: unknown[]) => {
    await Promise.all(Array.from(beforeAllFns.values()).map((f) => f(fnsStr, ...args)));
    return pipeWith(async (fn, res) => (isPromise(res)
      ? res.then((x) => compose(fn, x))
      : compose(fn, res)),
    [
      ...fns.map((fn) => async (r: unknown, l: unknown) =>
        pipeContextFns.has(fn) ? Promise.reject('context not passed') : fn(r, l)),
      (r: unknown, l: unknown) => r ?? l,
      (resp: unknown) => Promise.all(Array.from(afterAllFns.values()).map((f) => f(fnsStr, resp))).then(() => resp),
    ])(...args);
  };

  rpFn.replace = (replacements: Array<[number, Function]>) => {
    replacements.forEach(([i, fn]) => (fns[i] = fn));
    return rpFn;
  };

  rpFn.context = (ctx: unknown) => {
    fns.forEach((fn, i) => {
      if (pipeContextFns.has(fn)) {
        return fns[i] = fn(ctx);
      }
      if ((fn as any)[pipeSymbol]) {
        return fns[i] = (fn as typeof rpFn).context(ctx);
      }
    });
    return rpFn;
  };

  (rpFn as any)[pipeSymbol] = true;

  return rpFn;
}

export const p = rocketPipe;
export const ep = exitPipe;
export const iep = isExitPipeValue;
export const pc = pipeContext;

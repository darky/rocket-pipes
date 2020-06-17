declare module "@ramda/pipewith" {
  export default function (composer: (fn: Function, res: unknown) => unknown, fns: Array<Function>): (...args: unknown[]) => unknown;
}

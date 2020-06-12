import { rocketPipe } from "./index";
import { Either } from "monet";

const simple: () => Promise<string> = rocketPipe(
  () => 123,
  (x: number) => "qwe"
);

const promise: () => Promise<{
  test: boolean;
}> = rocketPipe(
  () => "qwe",
  (s: string) => Promise.resolve(true),
  (b: boolean) => ({ test: true })
);

const monetEither: () => Promise<{ test: string }> = rocketPipe(
  () => Either.right(123),
  (n: number) => Promise.resolve(Either.right("qwe")),
  (s: string) => ({ test: "qwe" })
);

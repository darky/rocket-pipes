# Rocket pipes

Powerful pipes for TypeScript, that chain Promise and ADT like Maybe or Either from popular FP libraries.

### Features

- 🍬 Sugar pipes. No worries about promises or ADT itself. Work with resolved values directly.
- 💡 Type inference. No worries about manual typing work. Types of resolved values inferred automatically.
- ⛓️ FP libraries friendly. Understand Catamorphism/Foldable libraries.
- 🖇️ Mix of Promise with FP library. Yes! Catamorphism/Foldable can be included in Promise.
- 🚪 Pipeline exit. You can exit from any place of pipeline with result value (it's also have proper type inference 🤘)
- 🏹 Pipeline replace. You can replace function on pipeline to another on the fly. Useful for mock testing.
- ➰ AOP. Use beforeAll/afterAll hooks for your pipelines.
- 🏓 Errors as rejected promises. You decide what need throw or handle.
- 🦥 Lazy. Pipeline returns function, that can be used later. It's friendly with Ramda or Sanctuary.

### Library support

| Vanilla | Monet                 | Purify                 |
|---------|-----------------------|------------------------|
| Promise | Either                | Either                 |
|         | Maybe                 | Maybe                  |
|         | Validation            | EitherAsync            |
|         | Promise\<Either\>     | MaybeAsync             |
|         | Promise\<Maybe\>      | Promise\<Either\>      |
|         | Promise\<Validation\> | Promise\<Maybe\>       |
|         |                       | Promise\<EitherAsync\> |
|         |                       | Promise\<MaybeAsync\>  |

### Examples

##### Basic

```ts
const resp = await rocketPipe(
  () => 123,
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

##### Exit pipeline

```ts
const resp = await rocketPipe(
  () => 123,
  (n) => exitPipe(n + 1),
  (n) => "qwe"
)();
expect(<number>resp + 1).toEqual(125);
```

##### Replace pipeline

```ts
const fn = rocketPipe(
  () => 123,
  (n) => n + 1
);
const resp = await fn.replace([[0, () => 124]])();
expect(resp + 1).toEqual(126);
```

##### AOP beforeAll/afterAll hooks

```ts
beforeAll((label, n) => {
  expect(label).toEqual("test");
  expect(n).toEqual(123);
});
afterAll((label, n) => {
  expect(label).toEqual("test");
  expect(n).toEqual(125);
});
rocketPipe(
  (n: number) => n + 1,
  (n) => n + 1
).label("test")(123);
```

##### AOP clear hooks

```ts
clearAfterAll();
clearBeforeAll();
```

##### Promise basic

```ts
const resp = await rocketPipe(
  () => Promise.resolve(123),
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

##### Either right

```ts
const resp = await rocketPipe(
  () => Either.right(123),
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

##### Promise can include anything supported

```ts
const resp = await rocketPipe(
  () => Promise.resolve(Either.right(123)),
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

##### Either left

```ts
const resp = await rocketPipe(
  () => Either.left(123),
  (_, l) => l + 1
)();
expect(resp + 1).toEqual(125);
```

##### Maybe some

```ts
const resp = await rocketPipe(
  () => Maybe.some(123),
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

##### Maybe none

```ts
const resp = await rocketPipe(
  () => Maybe.none(),
  (s, n) => s || n
)();
expect(resp).toEqual(void 0);
```

##### Validation success

```ts
const resp = await rocketPipe(
  () => Validation.success(123),
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

##### Validation fail

```ts
const resp = await rocketPipe(
  () => Validation.fail(123),
  (_, l) => l + 1
)();
expect(resp + 1).toEqual(125);
```

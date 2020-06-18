# Rocket pipes

Powerful pipes for TypeScript, that chain Promise and ADT like Maybe or Either from popular FP libraries.

### Features

* 🍬 Sugar pipes. No worries about promises or ADT itself. Work with resolved values directly.
* 💡 Type inference. No worries about manual typing work. Types of resolved values inferred automatically.
* ⛓️ FP libraries friendly. Understand Catamorphism/Foldable libraries.
* 🖇️ Mix of Promise with FP library. Yes! Catamorphism/Foldable can be included in Promise.
* 🚪 Pipeline exit. You can exit from any place of pipeline with result value (it's also have proper type inference 🤘)
* 🏓 Errors as rejected promises. You decide what need throw or handle.
* 🦥 Lazy. Pipeline returns function, that can be used later. It's friendly with Ramda or Sanctuary.

### Library support

<!-- EitherAsync, MaybeAsync -->

| Vanilla | Monet                 | Purify            |
|---------|-----------------------|-------------------|
| Promise | Either                | Either            |
|         | Maybe                 | Maybe             |
|         | Validation            | Promise\<Either\> |
|         | Promise\<Either\>     | Promise\<Maybe\>  |
|         | Promise\<Maybe\>      |                   |
|         | Promise\<Validation\> |                   |

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

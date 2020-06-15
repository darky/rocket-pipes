# Rocket pipes

Powerful pipes for TypeScript, that chain Promise and ADT like Maybe or Either from popular FP libraries
(currently tested Monet only)

### Features

* 🍬 Sugar pipes. No worries about promises or ADT itself. Work with resolved values directly.
* 💡 Type inference. No worries about manual typing work. Types of resolved values inferred automatically.
* ⛓️ FP libraries friendly. Understand Catamorphism/Foldable libraries (currently type coverage of Monet only)
* 🖇️ Mix of Promise with FP library. Yes! Catamorphism/Foldable can be included in Promise.
* 🚪 Pipeline exit. You can exit from any place of pipeline with result value (it's also have proper type inference 🤘)
* 🏓 Errors as rejected promises. You decide what need throw or handle.
* 🦥 Lazy. Pipeline returns function, that can be used later. It's friendly with Ramda or Sanctuary.

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

##### Monet Either right

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

##### Monet Either left

```ts
const resp = await rocketPipe(
  () => Either.left(123),
  (_, l) => l + 1
)();
expect(resp + 1).toEqual(125);
```

##### Monet Maybe some

```ts
const resp = await rocketPipe(
  () => Maybe.some(123),
  (n) => n + 1
)();
expect(resp + 1).toEqual(125);
```

##### Monet Maybe none

```ts
const resp = await rocketPipe(
  () => Maybe.none(),
  (s, n) => s || n
)();
expect(resp).toEqual(void 0);
```

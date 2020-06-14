# Rocket pipes

Powerful pipes for TypeScript, that chain Promise and ADT like Maybe or Either from popular FP libraries
(currently tested Monet only)

### Features

* 🍬 Sugar pipes. No worries about promises or ADT itself. Work with resolved values directly.
* 💡 Type inference. No worries about manual typing work. Types of resolved values inferred automatically.
* ⛓️ FP libraries friendly. Understand Catamorphism/Foldable libraries (currently type coverage of Monet only)
* 🖇️ Mix of Promise with FP library. Yes! Catamorphism/Foldable can be included in Promise.
* 🚪 Pipeline exit. You can exit from any place of pipeline with result value (it's also have proper type inference 🤘)
* 🏓 Errors as rejected promises. You decide need throw or handle.
* 🦥 Lazy. Pipeline return function, that can be used later. It's friendly with Ramda or Sanctuary.

### Examples

See tests https://github.com/darky/rocket-pipes/blob/master/index.test.ts

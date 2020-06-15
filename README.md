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

https://github.com/darky/rocket-pipes/blob/2becf669d3ec78da0c3f1b9da2743f23840eb6fc/index.test.ts#L7-L11

##### Exit pipeline

https://github.com/darky/rocket-pipes/blob/2becf669d3ec78da0c3f1b9da2743f23840eb6fc/index.test.ts#L39-L44

##### Promise

https://github.com/darky/rocket-pipes/blob/2becf669d3ec78da0c3f1b9da2743f23840eb6fc/index.test.ts#L59-L63

##### Monet Either right

https://github.com/darky/rocket-pipes/blob/2becf669d3ec78da0c3f1b9da2743f23840eb6fc/index.test.ts#L86-L90

##### Monet Either left

https://github.com/darky/rocket-pipes/blob/2becf669d3ec78da0c3f1b9da2743f23840eb6fc/index.test.ts#L110-L114

##### Monet Maybe some

https://github.com/darky/rocket-pipes/blob/2becf669d3ec78da0c3f1b9da2743f23840eb6fc/index.test.ts#L128-L132

##### Monet Maybe none

https://github.com/darky/rocket-pipes/blob/2becf669d3ec78da0c3f1b9da2743f23840eb6fc/index.test.ts#L152-L156




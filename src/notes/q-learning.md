---
title: Q-learning
subtitle: A basic overview of reinforcement learning from an idiot's perspective.
published: 2025-05-10
---

Since we are in the era of AI, who better to explain what Q-learning is than "Gemini 2.5
Flash" over at [t3.chat](https://t3.chat) created by [@theo](https://x.com/theo).

> *"Q-learning is a way for a computer program to learn the best things to do in different
situations by figuring out which actions give it the most 'points' or rewards over time. It
does this through trial and error."*

## Setup

Create a [Bun](https://bun.sh) project with default configuration.

```sh
# example.sh

bun init -y
```

## Global

**Goal:** Count from 0 to 4 with two possible actions, `-1` and `1` at each state.

```ts
// index.ts

const Q_TABLE = {
  0: { "-1": 0.0, "1": 0.0 },
  1: { "-1": 0.0, "1": 0.0 },
  2: { "-1": 0.0, "1": 0.0 },
  3: { "-1": 0.0, "1": 0.0 },
  4: { "-1": 0.0, "1": 0.0 },
};
```

Each state has initialised Q values of `0.0` with the aim that each state will have an action
with a Q value higher than the others. In our case, for incrementing we want the Q values for `1`
to end up the highest.

### Variables

```ts
// index.ts

const ALPHA = 0.1;       // Learning rate
const GAMMA = 0.9;       // Discount factor
const MIN_EPSILON = 0.1; // Minimum exploration rate
const DECAY = 0.03;      // Exploration decay
const EPISODES = 1_000;  // Training iterations

let EPSILON = 20;        // Exploration rate

const ACTIONS = [-1, 1] as const;
const GOAL = 4;
const START = 0;
```

- `ALPHA`: Higher the value, larger the reward for **new data**
- `GAMMA`: Higher the value, larger the reward for **future actions**

The aim is to start training by largely selecting an action randomly, as we gain data
this probability, i.e. the `EPSILON` value, decreases thus forcing us to use the Q values.

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnVjMnRhNW8xcWcyN29yajVyZzU5enFwd3IyM3MzNHNrYTJtNTExeCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/sfphdlqIxiigSXYmQU/giphy.gif" />

- **Exploration**: Randomly selecting an action for the current state, dependent on the
`EPSILON` value
- **Exploit**: Using the already gathered data to choose the best action for the current
state.

## Training

I created some helper types that aren't neccessary but useful to have.

```ts
// index.ts

type State = keyof typeof Q_TABLE;
type Action = (typeof ACTIONS)[number];
```

Exploring the actions for a given state is as simple as, depending on the `EPSILON` value,
**randomly choosing** between the possible actions. Exploit is looking through the Q values for
our state and **choosing the maximum** value action.

```ts
// index.ts

function randomAction() {
  return Math.random() > 0.5 ? ACTIONS[0] : ACTIONS[1];
}

function bestAction(state: State) {
  const values = Q_TABLE[state];
  return values["-1"] > values["1"] ? ACTIONS[0] : ACTIONS[1];
}
```

From either exploring or exploiting, we now have a desired action to use against our state
which is any value from 0 to 4. Other than guarding against overflows, we can just add our
state and action together.

```ts
// index.ts

function applyActionToState(state: State, action: Action) {
  return Math.max(0, Math.min(4, state + action)) as State;
}
```

> I don't like the `as` usage either, but for this short example... who cares?

With how basic our goal is, there's not many conditions to reward the program against.
One thing that I'm unsure of is adding a check for whether we are exploiting or exploring
to reward less/more but that is *sort of* covered by the global variables.

```ts
// index.ts

function getReward(state: number, nextState: number) {
  if (nextState === GOAL) return 2.0;
  if (nextState > state) return 1.0;
  if (nextState < state) return -1.0;
  else return 0.0;
}
```

<img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExeWs0N2g0ODloeXB6ZjJhZmF4ZG11bmRuaGZreHBiNTQwdWpxcWd4OSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o6MbqNPaatT8nnEmk/giphy.gif" />

Putting all of these together highlights the order:

1. Extracting an action
2. Q formula to update the Q values for our current state
3. Using our action to move our program forward
4. Decreasing the probability of exploring to refine existing data

```ts
// index.ts

const formula = (value: number, reward: number, nextValue: number) => {
  return value + ALPHA * (reward + GAMMA * nextValue - value);
};

function train() {
  for (let i = 0; i < EPISODES; i++) {
    let state: State = START;

    while (state < GOAL) {
      const shouldExplore = Math.random() < EPSILON;
      const action = shouldExplore ? randomAction() : bestAction(state);

      const nextState = applyActionToState(state, action);
      const nextBestAction = bestAction(nextState);

      Q_TABLE[state][action] = formula(
        Q_TABLE[state][action],
        getReward(state, nextState),
        nextBestAction,
      );
      state = nextState;
    }

    EPSILON = Math.max(MIN_EPSILON, EPSILON - DECAY);
  }
}
```

## Running

Utilising the Q table is as easy as picking the maximum Q value at each state, I've set a step
count just to ensure my CPU doesn't burn out due to a mistake I made.

```ts
// index.ts

function run() {
  let steps = 20;
  let state = START;

  while (steps > 0) {
    steps--;
    state = state + bestAction(state as State);
    if (state === GOAL) break;
  }
}
```

The Q table should now be populated with correct (or at least usable) Q values where the `1`
should have a higher value than the `-1` so the program increments at every state. Just looking
at the delta between the Q values show me the program could be **so much better** at rewarding or
punishing for each state.

```ts
// index.ts

const Q_TABLE = {
  0: { "-1": 0.09999999999999995, "1": 1.0999999999999992 },
  1: { "-1": -0.8999999999999995, "1": 1.0999999999999992 },
  2: { "-1": -0.8999999999999995, "1": 1.0999999999999992 },
  3: { "-1": -0.8999999999999995, "1": 2.099999999999998 },
  4: { "-1": 0.0, "1": 0.0 },
};
```

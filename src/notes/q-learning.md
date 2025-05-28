---
title: Basic Q-learning
subtitle: An idiot's overview of Q-learning (Reinforcement learning) in JavaScript.
published: 2025-05-20
---

Q-learning is a reinforcement learning algorithm. The goal is to build data
against a best action for a possible state by rewarding/punishing decisions
based on their outcome.

![Punish](https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNmJvanZrYThpcHExZGlsZGoxcHZpY3U5Yng1dXcwdWJyam82YzVkZyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/n6Sag3F42xLEA2LF1g/giphy.gif)

## Outline

Since I am awful at math, it's more useful for me to see a Q table structure in
code where I can visualise what a Q value is against an action for a state.

```js
{
  "state": {
    "actionA": 0.0, /* Q value */
    "actionB": 0.0  /* Q value */
  }
}
```

### Choosing An Action

We can build up this data by using the
[Epsilon-Greedy](https://medium.com/analytics-vidhya/the-epsilon-greedy-algorithm-for-reinforcement-learning-5fe6f96dc870)
algorithm where the value of `Epsilon` is used to determine whether we Explore
or Exploit.

- **Explore:** Randomly select an action for the current state
- **Exploit:** Use the most rewarded action for the current state

> The outcome of both will be measured to reward/punish the Q value for
that state

I think the general idea is that `Epsilon` should be around 10%. I've seen
examples where the `Epsilon` starts high (larger probability of exploring) and
decrements as the Q values are populated, promoting refinement as time moves
forward.

### Reward

I think the reward/punish implementation is the most unique part of Q-learning
relative to the goal, as the goal dictates what can be classed as "good" or
"bad". I've found the most common example is [Bellman's
Equation](https://www.geeksforgeeks.org/bellman-equation/).

## Setup

The goal is to count from 0 to 5, with two possible actions for each state i.e.
increment and decrement. I'm hard-coding a reward/punish value dependent on
getting closer or further from the goal respectively and having a static
`Epsilon` value of 10% throughout.

```js
// index.js

const GOAL = 5;
const ACTIONS = ["1", "-1"];
const [INC, DEC] = ACTIONS;
const STARTING_STATE = 0;

const ALPHA = 0.1;
const GAMMA = 0.9;
const EPSILON = 0.1;
const EPISODES = 1_000;

const TABLE = Array(GOAL + 1)
  .fill(0)
  .map(() => ({ [INC]: 0, [DEC]: 0 }));

function chooseAction(state) {
  if (Math.random() < EPSILON) {
    return ACTIONS[Math.floor(Math.random() * ACTIONS.length)];
  } else {
    return TABLE[state][INC] > TABLE[state][DEC] ? INC : DEC;
  }
}

function getNextState(state, action) {
  if (action === ACTIONS[0]) {
    return Math.min(GOAL, state + 1);
  } else {
    return Math.max(0, state - 1);
  }
}

function calculateReward(currentState, nextState) {
  return nextState > currentState ? 5 : -5;
}

function formula(value, reward, maxNext) {
  return value + ALPHA * (reward + GAMMA * maxNext - value);
}

function train() {
  for (let i = 0; i < EPISODES; i++) {
    let state = STARTING_STATE;

    while (state < GOAL) {
      const action = chooseAction(state);
      const nextState = getNextState(state, action);
      const reward = calculateReward(state, nextState);

      const maxNextValue = Math.max(TABLE[nextState][INC], TABLE[nextState][DEC]);
      const currentActionValue = TABLE[state][action];

      TABLE[state][action] = formula(currentActionValue, reward, maxNextValue);
      state = nextState;
    }
  }
}

function run() {
  let state = STARTING_STATE;
  while (state < GOAL) {
    const bestAction = TABLE[state][INC] > TABLE[state][DEC] ? INC : DEC;
    state = getNextState(state, bestAction);
  }
}
```

The refinement is far from good as the difference between the action's Q values
is too little, granular rewarding may improve this... or the more likely option
is I've messed the formula up somehow.

```txt
Before training: [
  { "1": 0, "-1": 0 },
  { "1": 0, "-1": 0 },
  { "1": 0, "-1": 0 },
  { "1": 0, "-1": 0 },
  { "1": 0, "-1": 0 },
  { "1": 0, "-1": 0 }
]

After training: [
  {"1": 20.47549999999996,  "-1": 13.408018416500038 },
  {"1": 17.194999999999972, "-1": 13.394894216391986 },
  {"1": 13.549999999999983, "-1": 10.427540623217663 },
  {"1": 9.49999999999999,   "-1": 7.166612111100579  },
  {"1": 4.9999999999999964, "-1": 3.5329384468382754 },
  {"1": 0,                  "-1": 0 }
]

State: 0 | Best action: 1
State: 1 | Best action: 1
State: 2 | Best action: 1
State: 3 | Best action: 1
State: 4 | Best action: 1
```

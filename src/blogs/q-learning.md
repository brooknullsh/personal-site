---
title: An Idiot's Guide To Q-Learning
subtitle: Building a basic and (sort of) easy to follow reinforcement learning example with Rust.
published: 2025-05-06
---

There's no real reason for me to learn this other than I was momentarily interested in
seeing a training loop spit out data it's judged as better or worse. In fact, I believe
that was my exact search query.

First thing's first, I am **not** good at math so that was a small fear of mine getting
into this as I know ML is one of the regions software can get a bit "math-y". Other than
that once I figured I could write it in Rust, it was more of an excuse to jump in as I
need reasons to learn that language.

<img alt="Bad at math" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMms2dWRpMGd4djI5OTMxazJvaTA0NjJxNnRsN244OHJ4NjFwOWY0NSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3owzW5c1tPq63MPmWk/giphy.gif" />

The aim with this implementation is to determine what needs to be done to get from
state 0 to state 4 with two possible actions i.e. +1 or -1. I'll
explain later how but in essence it's trial and error.

## Setup

If you don't have Rust and it's tooling installed, you can follow their instructions on
[doing so](https://www.rust-lang.org/tools/install). Assuming you have done that now or
previously (if you object then the rest of this becomes a bit difficult) we can create a
new project.

```sh frame="none"
cargo new --bin q-learning --vcs none
```

> The `--vcs` flag is to initialise the project without any version control,
[see more on cargo projects](https://doc.rust-lang.org/cargo/guide/creating-a-new-project.html)

We can now run the generated template program, with the built-in `cargo` command:

```rs
// src/main.rs

fn main() {
  println!("Hello, world!");
}
```

```sh frame="none"
cargo run
```

I then added three dependencies through `cargo` which also acts as a package manager
but you only need `rand` for this to work, the others are just for logging.

```sh frame="none"
cargo add rand log env_logger
```

## What Is It?

As we are in the "AI" era after all, I thought I'd ask a model "ELI5: What is Q-learning?"
and see the reponse. It spat out paragraph after paragraph so I had to follow-up with "Keep
it concise, please" which led me to this:

*"Q-learning is a way for an agent (like a robot) to learn the best actions to take in an
environment by trial and error. It does this by learning a "quality" (Q) value for each action
in each state, representing the expected future reward. The agent explores, gets rewards or
penalties, and updates these Q-values to improve its decision-making over time."*

Which will explain this far better than I could, but in all honesty, the implementation is not
too difficult to wrap your head around once you get started.

## Entry Point

To show the structure of this, I'm just going to highlight the end result of the `main`
function despite the undefined methods mentioned which we'll cover later. Keep in mind
this is a simple and bare implementation to just get the job done, knowing that I can
say that I split this into three steps:

- **Setup:** Initialising the Q table
- **Train:** Populating the Q table
- **Run:** Using the Q values within the table, pick the next action

```rs
// src/main.rs

const ACTIONS: (f32, f32) = (-1.0, 1.0);
const GOAL: u8 = 4;
const START: u8 = 0;

const ALPHA: f32 = 0.1;
const GAMMA: f32 = 0.9;
const EPSILON: f32 = 0.1;
const EPISODES: usize = 1_000;

type QTable = HashMap<u8, HashMap<String, f32>>;

fn init_logger() {
  Builder::from_default_env()
    .filter_level(LevelFilter::Trace)
    .format_timestamp(None)
    .format_target(false)
    .init();
}

fn main() {
  init_logger();

  /*
    "0": { "-1": 0.0, "1": 0.0 }
    "1": { "-1": 0.0, "1": 0.0 }
    "2": { "-1": 0.0, "1": 0.0 }
    "3": { "-1": 0.0, "1": 0.0 }
    "4": { "-1": 0.0, "1": 0.0 }
  */
  let mut q_table: QTable = HashMap::new();

  init_table(&mut q_table);
  train(&mut q_table);

  run(&q_table);
}
```

> Keep in mind that I've excluded relevant imports etc. and will continue to do so

As you can see by the comment above the `q_table` declaration, each state and it's two
possible actions are initialised to 0. The ideal end of the training step is to see these
actions have a clear (and right) maximum Q value that the run step will use to pick the best
action.

Let's create a `util.rs` file to store some of these helper methods (sue me, I use utility
files), like so:

```rs
// src/util.rs

pub fn init_table(q_table: &mut QTable) {
  for i in 0..=GOAL {
    let initial_state = [(ACTIONS.0.to_string(), 0.0), (ACTIONS.1.to_string(), 0.0)];
    q_table.insert(i, HashMap::from(initial_state));
  }
}
```

## Training

Now we have a clean starting state, we can train these Q values to prioritise the correct
action.

```rs
// src/main.rs

fn q_formula(q_value: &mut f32, reward: f32, next_state_max: f32) {
  *q_value += ALPHA * (reward + GAMMA * next_state_max - *q_value);
}

fn train(q_table: &mut QTable) {
  let mut rng = rand::rng();

  for _ in 0..EPISODES {
    let mut state = START;

    while state != GOAL {
      let action = if rng.random::<f32>() < EPSILON {
        random_action(&mut rng)
      } else {
        best_action(q_table, state)
      };

      let next_state = apply_action(state, action);
      let next_action = best_action(q_table, next_state);
      let q_value = current_state_q_value(q_table, state, action);

      q_formula(q_value, state_reward(state, next_state), next_action);
      state = next_state;
    }
  }

  log::debug!("trained data: {q_table:#?}");
}
```

The outline of the training step is to start by picking from two options:

### Explore

Randomly selecting an action, ignoring the Q values in hopes to gather more data.

```rs
// src/main.rs

random_action(&mut rng);
```

### Exploit

Using the data stored against the current state to select an action.

```rs
// src/main.rs

best_action(q_table, state);
```

Both of these options will update the action's corresponding Q values to then be used
in later episodes again and again. Some implementations I've seen have decremented the
`EPSILON` value through each episode by a relative amount so the later in the training
we are, the less we explore.

<img alt="Again and again" src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW1sOHJnMjI0OWF0MHh6cHgxbTlnaXF2dzMxeG1ieDYwazB2anhvdiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3ov9jQX2Ow4bM5xxuM/giphy.gif" />

Now to add these utility methods to our `src/util.rs` file:

```rs
// src/util.rs

pub fn random_action(rng: &mut ThreadRng) -> f32 {
  if rng.random::<f32>() < 0.5 {
    ACTIONS.0
  } else {
    ACTIONS.1
  }
}

pub fn best_action(q_table: &QTable, state: u8) -> f32 {
  let (action, _) = q_table
    .get(&state)
    .unwrap()
    .iter()
    .max_by(|a, b| a.1.partial_cmp(b.1).unwrap())
    .unwrap();

  action.parse::<f32>().unwrap()
}

pub fn apply_action(state: u8, action: f32) -> u8 {
  if action == -1.0 {
    state.saturating_sub(1)
  } else {
    u8::min(state + 1, GOAL)
  }
}

pub fn state_reward(state: u8, next_state: u8) -> f32 {
  match next_state {
    GOAL => 2.0,
    next if next > state => 1.0,
    next if next < state => -1.0,
    _ => 0.0,
  }
}
```

## Running

It's interesting to tweak the reward scheme, giving more or less for certain conditions
or even adding more to get finer granularity. Assuming I haven't missed too much, running
this training step should populate the Q table with data showing a clear action for each
state, like so:

```json
{
  0: { "-1": 0.89753497, "1": 1.8999994 },
  1: { "-1": -0.09942739, "1": 1.8999994 },
  2: { "1": 1.8999994, "-1": -0.09797247 },
  3: { "1": 1.0999994, "-1": -0.0996957 },
  4: { "1": 0.0, "-1": 0.0 },
}
```

Notice that our goal state has no associated Q value data, I'm actually not sure if that
is standard but we're breaking on the goal instead of processing it first here. Utilising
the data is as simple as looping and picking the highest Q value for each action for each
state, which as we can see from the data above will be +1 at every state.

```rs
// src/main.rs

fn run(q_table: &QTable) {
  let mut state = START;

  let steps: u8 = 20;
  for i in 1..=steps {
    let next_action = best_action(q_table, state);
    log::debug!("best action for {state}: {next_action}");

    state = apply_action(state, next_action);
    if state == GOAL {
      log::info!("finished in {} steps!", i);
      break;
    }
  }
}
```

```txt
[DEBUG] best action for 0: 1
[DEBUG] best action for 1: 1
[DEBUG] best action for 2: 1
[DEBUG] best action for 3: 1
[INFO ] finished in 4 steps!
```

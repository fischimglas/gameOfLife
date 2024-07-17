## Game of life

## Showcase

Open [public/index.html](public/index.html) in any browser to see it in action

## Use in your app

### Javascript

- Copy code in `app` to your application
- Import and initialize as shown below:

```typescript 
import {Factory} from "./<sourceDir>/Factory";
import {Helper} from "./<sourceDir>/Helper";
import {CallbackEvent, type Cell, type GameOfLife} from "~/<sourceDir>/Inerface";
import {gameOfLife} from "./<sourceDir>/GameOfLife";

const instance = new gameOfLife(Factory.gameCf({
  container: 'new-game-of-life',
  radius: 10,
  gutter: 2,
  speed: 450,
  colorCellDead: 'white',
  color: 'white',
}));

instance
	.apply(Helper.translateCellPositions(cf, [
		{x: 1, y: 1, alive: true, '#e3e3e3'},
	]))
	.on(CallbackEvent.click, (game, cell): void => {
		cell.color = color;
		cell.alive = true;
	})
	.on(CallbackEvent.hover, (game, cell): void => {
		cell.color = color;
		cell.alive = true;
	})
	.setColorFactory((): string => {
		return color;
	})
	.start();
```

### HTML

- The game is shown in a canvas which must be present in the DOM
  `<canvas id="new-game-of-life"></canvas>`
- Controls can be added with class "`action`" and a "`data-action`" attribute on any HTML element.
  Example:`<button class="action" data-action="start">Start</button>`
- The following actions are available: 
  - **start**: Start the game.
  - **stop**: Stop the game.
  - **tick**: Run one game interval.
  - **reset**: Reset all living cells to dead.


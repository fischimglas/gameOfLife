## Game of life

## Showcase

Open [public/index.html](public/index.html) in any browser to see it in action

## Include code

### Javascript

- Copy code in `app` to your application
- Import and initialize as shown below:

```typescript 
import {Factory} from "./<sourceDir>/Factory";
import {Helper} from "./<sourceDir>/Helper";
import {CallbackEvent} from "~/<sourceDir>/Inerface";
import {gameOfLife} from "./<sourceDir>/GameOfLife";

const instance = new gameOfLife(Factory.gameCf({
	container: 'new-game-of-life',  // ID of HTML canvas element in which the game of life is shown
	radius: 10,                     // Radius of cell
	gutter: 2,                      // Gutter between cells
	speed: 450,                     // Interval speed in ms
	colorCellDead: 'white'          // Init color of a (dead) cell
}));

instance
	// Add any pattern to the matrix. to center the elements, use Helper.translateCellPositions 
	.apply(Helper.translateCellPositions(cf, [
		{x: 1, y: 1, alive: true, '#e3e3e3'},
	]))
	// Add Event Handler. available Events: tick, extinct, stalled, click, hover
	.on(CallbackEvent.click, (game, cell) => {
		cell.color = color;
		cell.alive = true;
	})
	// Set the color of a living cell when it becomes alive. 
	.setColorFactory(() => {
		return '#e3e3e3';
	})
	// Start the game
	.start();
```

### HTML

- The game is shown in a canvas which must be present in the DOM
  `<canvas id="new-game-of-life"></canvas>`
  The matrix will be calculated based on the size of the canvas element.
- Controls can be added with class "`action`" and a "`data-action`" attribute on any HTML element.
  Example:`<button class="action" data-action="start">Start</button>`
- The following actions are available: 
  - **start**: Start the game.
  - **stop**: Stop the game.
  - **tick**: Run one game interval.
  - **reset**: Reset all living cells to dead.


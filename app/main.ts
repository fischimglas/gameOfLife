/**
 * Sample initialization of game-of-life
 */
'use strict';

import {CallbackEvent, Cell, GameOfLife} from './Inerface';
import {gameOfLife} from "./GameOfLife";
import {Factory} from "./Factory";

const instance = new gameOfLife({
	container: 'new-game-of-life',
	radius: 4,
	gutter: 2,
	speed: 200
});

instance
	.apply([
		{x: 21, y: 25, alive: true, color: '#A1A1A1'},
		{x: 21, y: 26, alive: true},
		{x: 21, y: 27, alive: true},
		{x: 22, y: 25, alive: true},
		{x: 20, y: 26, alive: true},
	])
	.on(CallbackEvent.tick, (game: GameOfLife): void => {
		document.getElementById('pop').innerHTML = game.population() + '';
		document.getElementById('cycle').innerHTML = game.cycle + '';
	})
	.on(CallbackEvent.extinct, (game: GameOfLife): void => {
		document.getElementById('status').innerHTML = 'Your population has died out';

		game.stop();
	})
	.on(CallbackEvent.stalled, (game: GameOfLife): void => {
		document.getElementById('status').innerHTML = 'Your population is in a deadlock';

		game.stop();
	})
	.on(CallbackEvent.click, (game: GameOfLife, cell: Cell): void => {
		cell.alive = true;
	})
	.on(CallbackEvent.hover, (game: GameOfLife, cell: Cell): void => {
		cell.alive = true;
		cell.color = Factory.color(0);
	})
	.setColorFactory((): string => {
		return instance.population() > 100 ? 'red' : 'green';
	});

setTimeout(() => instance.start(), 1200);


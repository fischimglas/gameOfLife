'use strict';

import {Factory} from './Factory';
import {CallbackEvent, Cell, GameOfLife} from './Inerface';

const instance = Factory.game({
	speed: 50,
	radius: 3,
	gutter: 2,
	width: 550,
	height: 550,
	container: 'new-game-of-life',
	color: null,
});

instance.apply([
	{x: 25, y: 25, alive: true},
	{x: 25, y: 26, alive: true},
	{x: 25, y: 27, alive: true},
	{x: 26, y: 25, alive: true},

	{x: 22, y: 25, alive: true},
	{x: 22, y: 26, alive: true},
	{x: 22, y: 27, alive: true},

	{x: 27, y: 25, alive: true},
	{x: 27, y: 26, alive: true},
	{x: 27, y: 27, alive: true},
]);

instance
	.on(CallbackEvent.tick, (game: GameOfLife): void => {
		document.getElementById('pop').innerHTML = game.pop + '';
		document.getElementById('cycle').innerHTML = game.cycle + '';
	})
	.on(CallbackEvent.extinct, (game: GameOfLife): void => {
		document.getElementById('status').innerHTML = 'Your population has died out';
	})
	.on(CallbackEvent.stalled, (game: GameOfLife): void => {
		document.getElementById('status').innerHTML = 'Your population is in a deadlock';
	})
	.on(CallbackEvent.click, (game: GameOfLife, cell: Cell): void => {
		cell.alive = true;
	})
	.on(CallbackEvent.hover, (game: GameOfLife, cell: Cell): void => {
		cell.alive = true;
	})

//instance.start();
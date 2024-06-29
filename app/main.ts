'use strict';

import {Factory} from './Factory';
import {CallbackEvent, GameOfLife} from './Inerface';

const instance = Factory.game({
	speed: 200,
	radius: 2,
	width: 200,
	height: 200,
	container: 'new-game-of-life',
	color: null
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

instance.on(CallbackEvent.tick, (game: GameOfLife): void => {
	document.getElementById('pop').innerHTML = game.pop + '';
	document.getElementById('cycle').innerHTML = game.cycle + '';
})
instance.on(CallbackEvent.extinct, (game: GameOfLife): void => {
	document.getElementById('status').innerHTML = 'Your population has died out';
})
instance.on(CallbackEvent.stalled, (game: GameOfLife): void => {
	document.getElementById('status').innerHTML = 'Your population has died out';
})

instance.start();
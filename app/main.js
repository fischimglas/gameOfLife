'use strict';

import gameOfLife from "./gameOfLife";
import {Factory} from './Factory';
import {CallbackEvent} from './Inerface';

const instance = Factory.game({
	speed: 200,
	radius: 2,
	width: 200,
	height: 200,
	container: 'new-game-of-life',
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
	// {x: 24, y: 26, alive: true},
]);
instance.start();

instance.on(CallbackEvent.tick, game => {
	document.getElementById('pop').innerHTML = game.pop;
	document.getElementById('cycle').innerHTML = game.cycle;
})
instance.on(CallbackEvent.extinct, game => {
	document.getElementById('status').innerHTML = 'Your population has died out';
})
instance.on(CallbackEvent.stalled, game => {
	document.getElementById('status').innerHTML = 'Your population has died out';
})

console.log('new game', instance);

/**
 * OLD
 */

gameOfLife.create();
gameOfLife.setCf({
	speed: 20,
	radius: 15,
	width: 10,
	height: 10,
});
gameOfLife.apply([
	{x: 5, y: 5, alive: true},
	{x: 5, y: 6, alive: true},
	{x: 5, y: 7, alive: true},
	{x: 5, y: 8, alive: true},
	{x: 6, y: 5, alive: true},
	{x: 4, y: 6, alive: true},
])
gameOfLife.tick(() => gameOfLife.draw());

gameOfLife.init();
gameOfLife.draw();


// gameOfLife.start();


// setTimeout(() => {
//     gameOfLife.reset();
// }, 3000);
import _ from "lodash";
import {State} from './State';
import {Helper} from '../app/Helper';
import {Factory} from '../app/Factory';

const colors = ['#008fd7', '#024494', '#002d71', '#ff1f11', '#00be1b'];

const Matrix = {}

const UI = {
	init() {
		window.requestAnimationFrame(UI.draw);
		_.each(document.getElementsByClassName('action'), btn => {
			btn.addEventListener('click', () => App.action(btn.getAttribute('data-action')));
		});

		_.each(document.getElementsByClassName('control'), control => {
			control.addEventListener('change', () => App.action(control.getAttribute('data-action')));
		});
	},
	draw() {
		const elem = document.getElementById('game-of-life');
		const context = elem.getContext('2d');

		context.clearRect(0, 0, elem.width, elem.height);
		_.values((Matrix)).forEach(e => {
			context.fillStyle = e.alive === true ? e.color : '#eee';
			context.beginPath();
			context.arc(e.x * State.radius * 2 + e.x + State.radius, e.y * State.radius * 2 + e.y + State.radius, State.radius, 0, 2 * Math.PI);
			context.fill();
		});

		context.fillText(App.population(), 10, 100);
		context.save();
	},
}

const App = {
	action(actionName, value) {
		if (_.isFunction(gameOfLife[actionName])) {
			gameOfLife[actionName](value);
		}
	},
	run() {
		App.cycle();
		setTimeout(() => {
			if (State.running === true) {
				App.run();
			}
		}, 10000 / State.speed);
	},
	reset() {
		let keys = _.keys(Matrix);
		keys.map(name => delete Matrix[name]);
		State.alive = 0;
		State.cycle = 0;
		State.running = false;
		console.log('RESET');
	},
	create() {
		Factory.createMatrix(State).forEach(it => Matrix[Helper.name(it)] = it);
	},
	population() {
		return _.values(Matrix).filter(it => it.alive === true).length;
	},
	translate(items, pos) {
		return items.map(it => ({x: it.x + pos.x, y: it.y + pos.y, alive: (it.alive === true)}));
	},
	cycle() {
		let changes = []
		State.cycle += 1;

		_.values(Matrix).map(dot => {
			const isAlive = (dot.alive === true);
			let isAliveNow = isAlive;

			// Get neighbours.
			const siblings = this.siblings(dot);
			const numAlive = siblings.filter(it => it.alive === true).length;

			// Game of life rules
			// #1 Any live cell with fewer than two live neighbours dies, as if by underpopulation.
			if (2 > numAlive) {
				isAliveNow = false;
			}
			// #2 Any live cell with two or three live neighbours lives on to the next generation.
			else if (isAlive === true && (numAlive === 2 || numAlive === 3)) {
				isAliveNow = true;
			}
			// #3 Any live cell with more than three live neighbours dies, as if by overpopulation.
			else if (3 < numAlive) {
				isAliveNow = false;
			}
			// #4 Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
			else if (false === isAlive && 3 === numAlive) {
				isAliveNow = true;
			}

			if (isAlive !== isAliveNow) {
				changes.push(Factory.dot(dot.x, dot.y, dot.color, isAliveNow));
			}
		});

		if (changes.length > 0) {
			changes.forEach(it => {
				if (Matrix[Helper.name(it)].alive !== true && it.alive === true) {
					Matrix[Helper.name(it)].color = State.color;
				}
				Matrix[Helper.name(it)].alive = (it.alive === true)
			});
		}

		State.alive = App.population();
		State.actionsTick.forEach(fn => fn());

		if (State.cycle % 30 === 0) {
			let $i = colors.indexOf(State.color);
			$i = $i === colors.length - 1 ? 0 : $i + 1;
			State.color = colors[$i];
		}
	},
	siblings(dot) {
		let result = [];
		const pat = [-1, 0, 1];
		pat.map(x => pat.map(y => {
			if (!(x === 0 && y === 0)) {
				result.push({x: dot.x + x, y: dot.y + y});
			}
		}));

		return _.filter(result.map(it => Matrix[Helper.name(it)]));
	},
	apply(schema) {
		schema.map(dot => {
			let item = Matrix[Helper.name(dot)];
			if (_.isObject(item)) {
				Matrix[Helper.name(dot)].alive = dot.alive === true
			}
		});
	},
}

const gameOfLife = {
	speed(value) {
		gameOfLife.stop();
		State.speed = value;
		gameOfLife.start();
	},
	start() {
		State.running = true;
		App.run();
		console.log('START');
	},
	stop() {
		State.running = false;
		console.log('STOP');
	},
	setCf(config) {
		_.keys(config).map(name => State[name] = config[name]);
	},
	create: App.create,
	reset: App.reset,
	apply: App.apply,
	init: UI.init,
	draw: UI.draw,
	matrix() {
		return _.values(Matrix);
	},
	population() {
		return State.alive;
	},
	alive() {
		return _.values(Matrix).filter(it => it.alive === true);
	},
	tick(fn) {
		State.actionsTick.push(fn);
	},
};

export default gameOfLife;
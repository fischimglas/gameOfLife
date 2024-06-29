import {Callback, CallbackEvent, Dot, Game, gameCf, Matrix} from "./Inerface";
import {Factory} from "./Factory";
import {Helper} from "./Helper";
import * as _ from "lodash";
import {Ui} from "./Ui";

let timeout = null;

function triggerCallbacks(name: CallbackEvent, game: Game): void {
	game.callbacks.map((it: Callback) => {
		if (name === it.name) {
			it.callback(game);
		}
	})
}

function tick(game: Game): void {
	const color = Helper.color(game.cycle);

	const changes = Helper.calcChanges(game.matrix);
	if (changes.length === 0) {
		triggerCallbacks(CallbackEvent.stalled, game);

		game.stop();
	}
	changes.map((it: Dot): void => {
		const name = Helper.name(it);
		if (game.matrix[name].alive !== true && it.alive === true) {
			game.matrix[name].color = color;
		}
		game.matrix[name].alive = it.alive === true;
	});

	Ui.draw(game.cf, game.matrix);

	triggerCallbacks(CallbackEvent.tick, game);
}


function runLoop(game: Game): void {
	tick(game);
	game.pop = Helper.population(game.matrix);

	if (game.pop === 0) {
		triggerCallbacks(CallbackEvent.extinct, game);
		game.stop();
	}

	game.cycle += 1;

	timeout = setTimeout(() => {
		if (game.isRunning !== true) {
			return;
		}
		runLoop(game);
	}, 10000 / game.cf.speed);
}

export class game implements Game {
	cf: gameCf = null
	matrix: Matrix = {}
	cycle: number = 0
	isRunning: boolean = false
	pop: number = 0
	callbacks: Callback[] = [];

	constructor(cf: gameCf) {
		this.cf = cf

		Factory.createMatrix(cf)
			.forEach((dot: Dot) => this.setDot(dot));

		window.requestAnimationFrame(() => Ui.draw(this.cf, this.matrix));
	}

	setDot(dot: Dot): void {
		this.matrix[Helper.name(dot)] = dot;
	}

	apply(dots: Dot[]): void {
		dots.map((dot: Dot) => {
			let item = this.matrix[Helper.name(dot)];
			if (_.isObject(item)) {
				this.matrix[Helper.name(dot)].alive = dot.alive === true
			}
		});
	}

	start(): void {
		this.isRunning = true;
		runLoop(this);
	}

	stop(): void {
		this.isRunning = false;
		clearTimeout(timeout);
	}

	setSpeed(speed: number): void {
		this.stop();
		this.cf.speed = speed;
		this.start();
	}

	on(name: CallbackEvent, callback: Function) {
		this.callbacks.push(Factory.callback(name, callback));
	}
}
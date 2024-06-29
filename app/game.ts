import {Callback, CallbackEvent, Dot, GameOfLife, gameCf, Matrix} from "./Inerface";
import {Factory} from "./Factory";
import {Helper} from "./Helper";
import * as _ from "lodash";
import {Ui} from "./Ui";

let timeout = null;

function triggerCallbacks(name: CallbackEvent, game: GameOfLife): void {
	game.callbacks.map((it: Callback) => {
		if (name === it.name) {
			it.callback(game);
		}
	})
}

function tick(game: GameOfLife): void {
	triggerCallbacks(CallbackEvent.tick, game);

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

	game.pop = Helper.population(game.matrix);

	if (game.pop === 0) {
		triggerCallbacks(CallbackEvent.extinct, game);
		game.stop();
	}

	game.cycle += 1;
}


function runLoop(game: GameOfLife): void {
	tick(game);

	timeout = setTimeout(() => {
		if (game.isRunning !== true) {
			return;
		}
		runLoop(game);
	}, 10000 / game.cf.speed);
}

export class game implements GameOfLife {
	cf: gameCf = null
	matrix: Matrix = {}
	cycle: number = 0
	isRunning: boolean = false
	pop: number = 0
	callbacks: Callback[] = [];
	actions: object = {};

	constructor(cf: gameCf) {
		this.cf = cf

		Ui.init(this);
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

	tick(): void {
		tick(this);
	}

	setSpeed(speed: number | string): void {
		const isRunning = this.isRunning;
		if (isRunning) {
			this.stop();
		}

		this.cf.speed = parseInt(speed + '');
		if (isRunning) {
			this.start();
		}
	}

	on(name: CallbackEvent, callback: Function) {
		this.callbacks.push(Factory.callback(name, callback));
	}

}
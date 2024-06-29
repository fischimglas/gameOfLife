import {Callback, CallbackEvent, Cell, gameCf, GameOfLife, Matrix} from "./Inerface";
import {Factory} from "./Factory";
import {Helper} from "./Helper";
import {Ui} from "./Ui";

let timeout = null;

function tick(game: GameOfLife): void {
	const color = Helper.color(game.cycle);

	const changes = Helper.calcChanges(game.matrix);
	changes.map((it: Cell): void => {
		const name = Helper.name(it);
		if (game.matrix[name].alive !== true && it.alive === true) {
			game.matrix[name].color = color;
		}
		game.matrix[name].alive = it.alive === true;
	});

	Ui.draw(game.cf, game.matrix);

	game.pop = Helper.population(game.matrix);

	Helper.triggerCallbacks(CallbackEvent.tick, game);

	if (changes.length === 0) {
		Helper.triggerCallbacks(CallbackEvent.stalled, game);
	}
	if (game.pop === 0) {
		Helper.triggerCallbacks(CallbackEvent.extinct, game);
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

export class gameOfLife implements GameOfLife {
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

	setDot(cell: Cell): GameOfLife {
		this.matrix[Helper.name(cell)] = cell;

		return this;
	}

	apply(cells: Cell[]): GameOfLife {
		cells.map((cell: Cell) => {
			let item = this.matrix[Helper.name(cell)];
			if (typeof item !== 'object') {
				return;
			}

			item.alive = cell.alive === true;
			if (cell.color) {
				item.color = cell.color;
			}
		});

		return this;
	}

	start(): GameOfLife {
		this.isRunning = true;
		runLoop(this);

		return this;
	}

	stop(): GameOfLife {
		this.isRunning = false;
		clearTimeout(timeout);

		return this;
	}

	tick(): GameOfLife {
		tick(this);

		return this;
	}

	setSpeed(speed: number | string): GameOfLife {
		const isRunning = this.isRunning;
		if (isRunning) {
			this.stop();
		}

		this.cf.speed = parseInt(speed + '');
		if (isRunning) {
			this.start();
		}

		return this;
	}

	on(name: CallbackEvent, callback: Function): GameOfLife {
		this.callbacks.push(Factory.callback(name, callback));

		return this;
	}

}
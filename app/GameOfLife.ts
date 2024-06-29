import {Callback, CallbackEvent, Cell, GameCf, GameOfLife, Matrix} from "./Inerface";
import {Factory} from "./Factory";
import {Helper} from "./Helper";
import {Ui} from "./Ui";

let timeout = null;

function tick(game: GameOfLife): void {
	const color = Factory.color(game.cycle);

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
	}, game.cf.speed);
}

export class gameOfLife implements GameOfLife {
	cf: GameCf = null
	matrix: Matrix = {}
	cycle: number = 0
	isRunning: boolean = false
	pop: number = 0
	callbacks: Callback[] = [];
	actions: object = {};

	constructor(cf: GameCf) {
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
		const input = Math.max(1, parseInt(speed + ''));
		this.cf.speed = Math.round(10000 / input);
		
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
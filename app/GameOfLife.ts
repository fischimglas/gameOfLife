import {Callback, CallbackEvent, Cell, GameCf, GameInitCf, GameOfLife, Matrix} from "./Inerface";
import {Factory} from "./Factory";
import {Helper} from "./Helper";
import {Ui} from "./Ui";

let timeout: ReturnType<typeof setTimeout> = null;

function tick(game: GameOfLife): void {
	const color = game.cf.colorFactory(game.cycle);

	const changes = Helper.calcChanges(game.matrix);
	changes.forEach((it: Cell): void => {
		const name = Helper.name(it);
		if (game.matrix[name].alive !== true && it.alive === true) {
			game.matrix[name].color = color;
		}
		game.matrix[name].alive = it.alive === true;
	});

	Ui.draw(game.cf, game.matrix);

	Helper.triggerCallbacks(CallbackEvent.tick, game);

	if (changes.length === 0) {
		Helper.triggerCallbacks(CallbackEvent.stalled, game);
	}
	if (game.population() === 0) {
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

	constructor(cf: GameInitCf) {
		this.cf = Factory.gameCf(cf);

		Ui.init(this);
	}

	population(): number {
		return Object.values(this.matrix).filter((it: Cell) => it.alive === true).length;
	}

	setCell(cell: Cell): GameOfLife {
		this.matrix[Helper.name(cell)] = cell;

		return this;
	}

	setColorFactory(colorFactory: Function): GameOfLife {
		this.cf.colorFactory = colorFactory;

		return this;
	}

	apply(cells: Cell[]): GameOfLife {
		cells.forEach((cell: Cell): void => {
			let item = this.matrix[Helper.name(cell)];
			if (!item) {
				console.warn('item does not exist', cell);
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
		if (timeout !== null) {
			clearTimeout(timeout);
		}

		return this;
	}

	tick(): GameOfLife {
		tick(this);

		return this;
	}

	reset(): GameOfLife {
		this.cycle = 0;
		Object.values(this.matrix).forEach(it => {
			it.alive = false;
			it.color = this.cf.colorCellDead;
		});
		Ui.draw(this.cf, this.matrix);

		return this;
	}

	setSpeed(speed: number | string): GameOfLife {
		const isRunning = this.isRunning;
		if (isRunning) {
			this.stop();
		}
		const parsedSpeed = Math.max(1, parseInt(speed + ''));
		this.cf.speed = Math.round(10000 / parsedSpeed);

		if (isRunning) {
			this.start();
		}

		return this;
	}

	on(name: CallbackEvent, callback: () => void): GameOfLife {
		this.callbacks.push(Factory.callback(name, callback));

		return this;
	}

}
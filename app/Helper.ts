import {Callback, CallbackEvent, Cell, Coordinate, GameCf, GameOfLife, Matrix} from "./Inerface";
import {Factory} from "./Factory";

function gameOfLifeRules(matrix: Matrix, cell: Cell): Cell {
	const isAlive = (cell.alive === true);
	let isAliveNow = isAlive;

	// Get neighbours.
	const siblings = Helper.getNeighbors(matrix, cell);
	const numAlive = siblings.filter((it: Cell) => it.alive === true).length;

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

	return isAlive !== isAliveNow ? Factory.cell(cell.x, cell.y, cell.color, isAliveNow) : null;
}

export const Helper = {
	range(from: number, to: number): number[] {
		return Array.from({length: (to - from)}, (x, i) => i + from);
	},
	name(cell: Coordinate): string {
		return `${cell.x}X${cell.y}`;
	},
	getNeighbors(matrix: Matrix, cell: Cell): Cell[] {
		const directions = [-1, 0, 1];
		const neighbors: Cell[] = [];

		directions.forEach(dx => {
			directions.forEach(dy => {
				if (dx === 0 && dy === 0) return;
				const neighbor = matrix[this.name(Factory.coordinate(cell.x + dx, cell.y + dy))];
				if (neighbor) neighbors.push(neighbor);
			});
		});

		return neighbors;
	},
	calcChanges(matrix: Matrix): Cell[] {
		return Object.values(matrix).map((cell: Cell) => gameOfLifeRules(matrix, cell)).filter(it => it !== null);
	},
	getCellByCoord(game: GameOfLife, coordinate: Coordinate): Cell {
		return game.matrix[this.name(coordinate)];
	},
	cellByPos(game: GameOfLife, clickPos: Coordinate): Cell {
		const {radius: R, gutter: G} = game.cf;

		const x = Math.round((clickPos.x - R) / (R * 2 + G));
		const y = Math.round((clickPos.y - R) / (R * 2 + G));

		return this.getCellByCoord(game, Factory.coordinate(x, y));
	},
	calcPosByCoord(cf: GameCf, coordinate: Coordinate): Coordinate {
		const {radius: R, gutter: G} = cf;

		const x = coordinate.x * R * 2 + coordinate.x * G + R;
		const y = coordinate.y * R * 2 + coordinate.y * G + R;

		return Factory.coordinate(x, y);
	},
	triggerCallbacks(eventName: CallbackEvent, game: GameOfLife, data: any = null): void {
		game.callbacks.forEach((callbackObj: Callback) => {
			if (eventName === callbackObj.name) {
				callbackObj.callback(game, data);
			}
		})
	},
	getMouseInContainerCoordinates(container: HTMLElement, e: MouseEvent): Coordinate {
		const rect = container.getBoundingClientRect();
		return Factory.coordinate(e.clientX - rect.left, e.clientY - rect.top);
	}
}

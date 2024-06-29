import {Callback, CallbackEvent, Cell, Coordinate, GameCf, GameOfLife, Matrix} from "./Inerface";
import * as _ from "lodash";
import {Factory} from "./Factory";

function gameOfLifeRules(matrix: Matrix, cell: Cell): Cell {
	const isAlive = (cell.alive === true);
	let isAliveNow = isAlive;

	// Get neighbours.
	const siblings = Helper.siblings(matrix, cell);
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
	name(cell: Coordinate): string {
		return cell.x + 'X' + cell.y;
	},
	population(matrix: Matrix): number {
		return _.values(matrix).filter((it: Cell) => it.alive === true).length;
	},
	siblings(matrix: Matrix, cell: Cell): Cell[] {
		const pat = [-1, 0, 1];
		let result = [];
		pat.map((x: number) => pat.map((y: number): Cell => {
			if (x === 0 && y === 0) {
				return null;
			}

			result.push(matrix[Helper.name(Factory.cell(cell.x + x, cell.y + y))]);
		}));

		return _.filter(result);
	},
	calcChanges(matrix: Matrix): Cell[] {
		return _.filter(_.values(matrix).map((cell: Cell) => gameOfLifeRules(matrix, cell)));
	},
	getCellByCoord(game: GameOfLife, coordinate: Coordinate): Cell {
		return game.matrix[this.name(coordinate)];
	},
	cellByPos(game: GameOfLife, clickPos: Coordinate): Cell {
		const R = game.cf.radius;
		const G = game.cf.gutter;

		const x = Math.round((clickPos.x - R) / (R * 2 + G));
		const y = Math.round((clickPos.y - R) / (R * 2 + G));

		return this.getCellByCoord(game, Factory.coordinate(x, y));
	},
	calcPosByCoord(cf: GameCf, coordinate: Coordinate): Coordinate {
		const R = cf.radius;
		const G = cf.gutter;

		const x = coordinate.x * R * 2 + coordinate.x * G + R;
		const y = coordinate.y * R * 2 + coordinate.y * G + R;

		return Factory.coordinate(x, y);
	},
	triggerCallbacks(name: CallbackEvent, game: GameOfLife, data: any = null): void {
		game.callbacks.map((it: Callback) => {
			if (name === it.name) {
				it.callback(game, data);
			}
		})
	},
	getMouseInContainerCoordinates(container: HTMLElement, e: MouseEvent): Coordinate {
		const pos = container.getBoundingClientRect();
		return Factory.coordinate(e.clientX - pos.left, e.clientY - pos.top);
	}
}

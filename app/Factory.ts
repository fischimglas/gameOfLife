import {Callback, CallbackEvent, Cell, Coordinate, gameCf, GameOfLife} from "./Inerface";
import * as _ from "lodash";
import {gameOfLife} from "./GameOfLife";
import {Helper} from "./Helper";

const defaultGameCf = {
	speed: 50,
	radius: 3,
	gutter: 2,
	width: 20,
	height: 20,
	container: 'new-game-of-life',
	color: null,
	colorCellDead: '#eeeeee',
};

export const Factory = {
	createMatrix(state: gameCf): Cell[] {
		return _.flatten(_.range(0, state.width).map((x: number) => _.range(0, state.height).map((y: number) => (this.cell(x, y, state.color)))));
	},
	cell(x: number = 0, y: number = 0, color: string = null, alive: boolean = false): Cell {
		return {
			x,
			y,
			alive,
			color: color ? color : Helper.color(0),
		}
	},
	coordinate(x: number = 0, y: number = 0): Coordinate {
		return {
			x,
			y
		}
	},
	game(cf: object): GameOfLife {
		return new gameOfLife(Factory.gameCf(cf));
	},
	gameCf(cf: object): gameCf {
		return _.defaults(cf, defaultGameCf)
	},
	callback(name: CallbackEvent, callback: Function): Callback {
		return {name, callback};
	}
}
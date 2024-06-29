import {Callback, CallbackEvent, Cell, gameCf, GameOfLife} from "./Inerface";
import * as _ from "lodash";
import {gameOfLife} from "./GameOfLife";
import {Helper} from "./Helper";

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
	game(cf: gameCf): GameOfLife {
		return new gameOfLife(cf);
	},
	callback(name: CallbackEvent, callback: Function): Callback {
		return {name, callback};
	}
}
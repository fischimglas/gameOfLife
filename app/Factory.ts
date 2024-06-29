import {Callback, CallbackEvent, Dot, Game, gameCf} from "./Inerface";
import * as _ from "lodash";
import {game} from "./game";
import {Helper} from "./Helper";

export const Factory = {
	createMatrix(state: gameCf): Dot[] {
		return _.flatten(_.range(0, state.width).map((x: number) => _.range(0, state.height).map((y: number) => (this.dot(x, y, state.color)))));
	},
	dot(x: number = 0, y: number = 0, color: string = null, alive: boolean = false): Dot {
		return {
			x,
			y,
			alive,
			color: color ? color : Helper.color(0),
		}
	},
	game(cf: gameCf): Game {
		return new game(cf);
	},
	callback(name: CallbackEvent, callback: Function): Callback {
		return {name, callback};
	}
}
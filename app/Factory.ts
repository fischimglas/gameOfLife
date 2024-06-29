import {Callback, CallbackEvent, Cell, Coordinate, GameCf, GameInitCf, GameOfLife} from "./Inerface";
import {gameOfLife} from "./GameOfLife";
import {Helper} from "./Helper";

const defaultGameCf = {
	speed: 50,
	radius: 15,
	gutter: 5,
	container: 'new-game-of-life',
	color: null,
	colorCellDead: '#eeeeee',
};


const colorsSource = [
	'#440154',
	'#481467',
	'#482576',
	'#453781',
	'#404688',
	'#39558c',
	'#33638d',
	'#2d718e',
	'#287d8e',
	'#238a8d',
	'#1f968b',
	'#20a386',
	'#29af7f',
	'#3dbc74',
	'#56c667',
	'#75d054',
	'#95d840',
	'#bade28',
	'#dde318',
	'#fde725'
];
const colors = colorsSource.concat(colorsSource.slice().reverse());

let colorIndex = 0;

export const Factory = {
	color(cycle: number = 0): string {

		if (cycle !== 0 && cycle % 30 === 0) {
			colorIndex += 1;
			if (colors.length <= colorIndex) {
				colorIndex = 0;
			}
		}

		return colors[colorIndex];
	},
	createMatrix(cf: GameCf): Cell[] {
		const elementWidth = cf.radius * 2 + cf.gutter
		const w = Math.ceil(cf.width / elementWidth);
		const h = Math.ceil(cf.height / elementWidth);
		return Helper.range(0, w).map((x: number): Cell[] => Helper.range(0, h).map((y: number) => (this.cell(x, y, cf.color)))).flat();
	},
	cell(x: number = 0, y: number = 0, color: string = null, alive: boolean = false): Cell {
		return {x, y, alive, color: color ? color : Factory.color(),}
	},
	coordinate(x: number = 0, y: number = 0): Coordinate {
		return {x, y}
	},
	game(cf: GameInitCf): GameOfLife {
		const container = document.getElementById(cf.container);
		if (!cf.width || cf.width === 'auto') {
			cf.width = container.clientWidth;
		}
		if (!cf.height || cf.height === 'auto') {
			cf.height = container.clientHeight;
		}

		return new gameOfLife(Factory.gameCf(cf));
	},
	gameCf(cf: GameInitCf): GameCf {
		const container = document.getElementById(cf.container);
		if (!cf.width || cf.width === 'auto') {
			cf.width = container.clientWidth;
		}
		if (!cf.height || cf.height === 'auto') {
			cf.height = container.clientHeight;
		}

		// @ts-ignore
		return Object.assign({}, defaultGameCf, cf);
	},
	callback(name: CallbackEvent, callback: Function): Callback {
		return {name, callback};
	}
}
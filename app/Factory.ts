import {Callback, CallbackEvent, Cell, Coordinate, GameCf, GameInitCf} from "./Inerface";

import {Helper} from "./Helper";

const colors = [
	'#440154',
	'#404688',
	'#39558c',
	'#33638d',
	'#2d718e',
	'#287d8e',
	'#238a8d',
	'#1f968b',
	'#1f968b',
	'#20a386',
	'#29af7f',
	'#3dbc74',
	'#56c667',
	'#75d054',
	'#95d840',
	'#bade28',
	'#dde318',
	'#fde725',
	'#ffc168',
	'#ff8b68',
	'#e45f5e',
	'#dc4c59',
	'#d33b67',
	'#c72e79',
	'#b9207f',
	'#a91484',
	'#960578',
	'#840271',
];

function colorFactory(cycle: number = 0): string {
	const colorIndex = Math.floor(cycle / 30) % colors.length;

	return colors[colorIndex];
}

const defaultGameCf = {
	speed: <number>50,
	radius: <number>15,
	gutter: <number>5,
	container: <string>'new-game-of-life',
	color: <string>null,
	colorCellDead: <string>'#eeeeee',
	colorFactory
};

export const Factory = {
	color(cycle: number = 0): string {
		return colorFactory(cycle);
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
	callback(name: CallbackEvent, callback: () => void): Callback {
		return {name, callback};
	}
}

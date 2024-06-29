import {Coordinate, Dot, Matrix} from "./Inerface";
import * as _ from "lodash";
import {Factory} from "./Factory";

const colors = [
	"#440154",
	"#481467",
	"#482576",
	"#453781",
	"#404688",
	"#39558c",
	"#33638d",
	"#2d718e",
	"#287d8e",
	"#238a8d",
	"#1f968b",
	"#20a386",
	"#29af7f",
	"#3dbc74",
	"#56c667",
	"#75d054",
	"#95d840",
	"#bade28",
	"#dde318",
	"#fde725"
];
let colorIndex = 0;


function gameOfLifeRules(matrix: Matrix, dot: Dot): Dot {
	const isAlive = (dot.alive === true);
	let isAliveNow = isAlive;

	// Get neighbours.
	const siblings = Helper.siblings(matrix, dot);
	const numAlive = siblings.filter((it: Dot) => it.alive === true).length;

	// Game of life rules
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

	return isAlive !== isAliveNow ? Factory.dot(dot.x, dot.y, dot.color, isAliveNow) : null;
}

export const Helper = {
	name(dot: Coordinate): string {
		return dot.x + 'X' + dot.y;
	},
	color(cycle: number): string {
		if (cycle % 30 === 0) {
			colorIndex += 1;
			if (colors.length <= colorIndex) {
				colorIndex = 0;
			}
		}

		return colors[colorIndex];
	},
	population(matrix: Matrix): number {
		return _.values(matrix).filter((it: Dot) => it.alive === true).length;
	},
	siblings(matrix: Matrix, dot: Dot): Dot[] {
		const pat = [-1, 0, 1];
		let result = [];
		pat.map((x: number) => pat.map((y: number): Dot => {
			if (x === 0 && y === 0) {
				return null;
			}

			result.push(matrix[Helper.name(Factory.dot(dot.x + x, dot.y + y))]);
		}));

		return _.filter(result);
	},
	calcChanges(matrix: Matrix): Dot[] {
		return _.filter(_.values(matrix).map((dot: Dot) => gameOfLifeRules(matrix, dot)));
	},
}

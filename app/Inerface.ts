export interface Cell extends Coordinate {
	alive: boolean,
	color?: string
}

export interface Coordinate {
	x: number,
	y: number,
}

export interface GameCf {
	width: number,
	height: number,
	color: string,
	radius: number,
	gutter: number,
	speed: number,
	container: string,
	colorCellDead: string,
	colorFactory: Function,
}

export interface GameInitCf {
	width?: number | string,
	height?: number | string,
	color?: string,
	radius?: number,
	gutter?: number,
	speed?: number,
	container: string,
	colorCellDead?: string,
}

export interface GameOfLife {
	[key: string]: any;
	cf: GameCf,
	cycle: number,
	isRunning: boolean,
	callbacks: Callback[],
	matrix: Matrix,
	start: Function,
	stop: Function
	reset: Function
	apply: Function
	setCell: Function
	setColorFactory: Function
	population: Function
	on: Function
}

export interface Matrix {
	[index: string]: any
}

export interface Callback {
	name: CallbackEvent
	callback: (game: GameOfLife, data: any) => void;
}

export enum CallbackEvent {
	tick = 'tick',
	extinct = 'extinct',
	stalled = 'stalled',
	click = 'click',
	hover = 'hover',
}

export enum CfElement {
	width = 'width',
	height = 'height',
	color = 'color',
	radius = 'radius',
	gutter = 'gutter',
	speed = 'speed',
	container = 'container',
	colorCellDead = 'colorCellDead',
	colorFactory = 'colorFactory',
}
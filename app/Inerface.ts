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
	cf: GameCf,
	pop: number,
	cycle: number,
	isRunning: boolean,
	callbacks: object[],
	matrix: Matrix,
	actions: object,
	start: Function,
	stop: Function
	apply: Function
	setDot: Function
	on: Function
}

export interface Matrix {

}

export interface Callback {
	name: CallbackEvent
	callback: Function
}

export enum CallbackEvent {
	tick = 'tick',
	extinct = 'extinct',
	stalled = 'stalled',
	click = 'click',
	hover = 'hover',
}
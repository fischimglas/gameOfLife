export interface Dot extends Coordinate {
	alive: boolean,
	color: string
}

export interface Coordinate {
	x: number,
	y: number,
}

export interface gameCf {
	width: number,
	height: number,
	color: string,
	radius: number,
	speed: number,
	container: string,
}

export interface GameOfLife {
	cf: gameCf,
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
	stalled = 'stalled'
}
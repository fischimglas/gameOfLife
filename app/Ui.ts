import {CallbackEvent, Cell, GameCf, GameOfLife, Matrix} from "./Inerface";
import {Helper} from "./Helper";
import {Factory} from "./Factory";

export const Ui = {
	init(game: GameOfLife): void {
		Factory.createMatrix(game.cf)
			.forEach((cell: Cell) => game.setDot(cell));

		Ui.draw(game.cf, game.matrix);

		Array.from(document.getElementsByClassName('action')).forEach((control: HTMLElement): void => {
			control.addEventListener('click', () => this.callAction(game, control.getAttribute('data-action')));
		});

		Array.from(document.getElementsByClassName('control')).forEach((control: HTMLInputElement): void => {
			control.addEventListener('change', () => this.callAction(game, control.getAttribute('data-action'), control.value));
		});

		const priv = {
			container: <HTMLCanvasElement>document.getElementById(game.cf.container),
			mouseDown: <boolean>false,
		}

		priv.container.addEventListener('click', e => {
			const coordinate = Helper.getMouseInContainerCoordinates(priv.container, e);
			const cell = Helper.cellByPos(game, coordinate);
			if (typeof cell !== 'object') {
				return;
			}
			Helper.triggerCallbacks(CallbackEvent.click, game, cell);

			this.draw(game.cf, game.matrix);
		});


		priv.container.addEventListener('mousedown', e => {
			priv.mouseDown = true;
		});
		priv.container.addEventListener('mouseup', e => {
			priv.mouseDown = false;
		});
		priv.container.addEventListener('mousemove', e => {
			if (priv.mouseDown !== true) {
				return;
			}

			const coordinate = Helper.getMouseInContainerCoordinates(priv.container, e);
			const cell = Helper.cellByPos(game, coordinate);
			if (typeof cell !== 'object') {
				return;
			}
			Helper.triggerCallbacks(CallbackEvent.hover, game, cell);

			this.draw(game.cf, game.matrix);
		});
	},
	draw(cf: GameCf, matrix: Matrix): void {
		window.requestAnimationFrame((): void => {
			const elem = <HTMLCanvasElement>document.getElementById(cf.container);
			const context = elem.getContext('2d');
			const dots = Object.values(matrix);
			context.clearRect(0, 0, elem.width, elem.height);
			dots.forEach((dot: Cell): void => {
				context.fillStyle = dot.alive === true ? dot.color : cf.colorCellDead;
				context.beginPath();

				const pos = Helper.calcPosByCoord(cf, dot);

				context.arc(pos.x, pos.y, cf.radius, 0, 2 * Math.PI);
				context.fill();
			});

			context.save();
		});

	},
	callAction(game: GameOfLife, actionName: string, value?: string | number): void {
		if (typeof game[actionName] === 'function') {
			game[actionName](value);
		}
	}
}
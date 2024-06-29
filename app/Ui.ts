import * as _ from "lodash";
import {Dot, Game, gameCf, Matrix} from "./Inerface";
import {Helper} from "./Helper";
import {Factory} from "./Factory";


export const Ui = {
	init(game: Game): void {
		Factory.createMatrix(game.cf)
			.forEach((dot: Dot) => game.setDot(dot));

		window.requestAnimationFrame(() => Ui.draw(game.cf, game.matrix));

		_.each(document.getElementsByClassName('action'), (control: HTMLElement) => {
			control.addEventListener('click', () => this.callAction(game, control.getAttribute('data-action')));
		});

		_.each(document.getElementsByClassName('control'), (control: HTMLElement) => {
			control.addEventListener('change', () => this.callAction(game, control.getAttribute('data-action'), control.value));
		});
	},
	draw(cf: gameCf, matrix: Matrix): void {
		const elem = document.getElementById(cf.container);
		const context = elem.getContext('2d');
		const dots = _.values(matrix);
		context.clearRect(0, 0, elem.width, elem.height);
		dots.forEach((dot: Dot) => {
			context.fillStyle = dot.alive === true ? dot.color : '#eee';
			context.beginPath();
			context.arc(dot.x * cf.radius * 2 + dot.x + cf.radius, dot.y * cf.radius * 2 + dot.y + cf.radius, cf.radius, 0, 2 * Math.PI);
			context.fill();
		});

		context.fillText(Helper.population(dots), 10, 100);
		context.save();
	},

	callAction(game: Game, actionName: string, value?: string | number): void {
		console.log('call action', actionName, value);
		
		if (_.isFunction(game[actionName])) {
			game[actionName](value);
		}
	}
}
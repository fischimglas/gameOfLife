import * as _ from "lodash";
import {Dot, gameCf, Matrix} from "./Inerface";
import {Helper} from "./Helper";


export const Ui = {
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
}
let cf = null;
import _ from 'lodash';
import M from './matrix';

const canvas = {

    init(initCf) {
        cf = initCf;
        window.requestAnimationFrame(canvas.draw);
    },

    draw() {
        let ctx = document.getElementById(cf.element).getContext('2d');

        // Need to set dimension!!
        // TODO
        ctx.canvas.width = cf.width;
        ctx.canvas.height = cf.height;
        ctx.globalCompositeOperation = 'destination-over';
        // TODO
        ctx.clearRect(0, 0, cf.width, cf.height); // clear canvas

        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
        ctx.save();
        ctx.translate(7, 7);

        // TODO
        let distance = 15;

        // TODO
        _.each(M.get(), p => {

            ctx.beginPath();
            // context.arc(x,y,r,sAngle,eAngle,counterclockwise);
            ctx.arc(p.x * distance, p.y * distance, 5, 0, 2 * Math.PI);
            ctx.fillStyle = p.a ? 'black' : 'white';
            ctx.fill();
        });

        window.requestAnimationFrame(canvas.draw);
    }
}

export default canvas;
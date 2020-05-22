const _ = require('lodash');
const M = require('./matrix');


let clickHandler = null;
class Canvas {

    /**
     *
     * @param width
     * @param height
     * @param elementId
     * @param cellsize
     */
    constructor({width, height, elementId, cellsize}) {
        this.width = width;
        this.height = height;
        this.cellsize = cellsize;
        this.elementId = elementId;

        window.requestAnimationFrame(() => {
            this.ctx = document.getElementById(this.elementId).getContext('2d');
            this.draw()
        });

    }

    setReadDataHandler(readDataFnc) {
        this.readDataFnc = readDataFnc;
    }

    draw() {
        if (!document.getElementById(this.elementId)) {
            return false;
        }
        let ctx = this.ctx;

        // Need to set dimension!!
        // TODO
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;
        ctx.globalCompositeOperation = 'destination-over';
        // TODO
        ctx.clearRect(0, 0, this.width, this.height); // clear canvas

        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        // ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';
        ctx.save();
        // ctx.translate(this.cellsize / 2, this.cellsize / 2);

        // TODO
        let distance = this.cellsize * 1.5;

        // TODO
        if (_.isFunction(this.readDataFnc)) {
            _.each(this.readDataFnc(), p => {
                ctx.beginPath();
                // context.arc(x,y,r,sAngle,eAngle,counterclockwise);
                ctx.arc(p.x * distance, p.y * distance, this.cellsize / 2, 0, 2 * Math.PI);
                ctx.fillStyle = p.a ? 'black' : 'white';
                if (p.a === 2) {
                    ctx.fillStyle = 'red';
                }
                ctx.fill();
            });
        }
        ctx.restore();

        window.requestAnimationFrame(() => {
            this.draw();
        });
    }
}

/**
 *
 * @type {}
 */
const canvas = {
    getCursorPosition(can, event) {
        var rect = can.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return {x: x, y: y};
    },
    /**
     *
     * @param initCf
     * @return {Canvas}
     */
    init(initCf) {
        return new Canvas(initCf);
    },
    /**
     *
     * @param x
     * @param y
     * @return {{x: number, y: number}}
     */
    calcCellIdByPos({x, y}) {
        let newX = Math.round(x / 10);
        let newY = Math.round(y / 10);
        return {'x': newX, 'y': newY};
    }
}

module.exports = canvas;
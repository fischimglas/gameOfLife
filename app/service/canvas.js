import _ from 'lodash';
import M from './matrix';

let cf = null;
let clickHandler = null;

// function getCursorPosition(can, event) {
//     var rect = can.getBoundingClientRect();
//     var x = event.clientX - rect.left;
//     var y = event.clientY - rect.top;
//     return {x: x, y: y};
// }

// function getElementPosition(can, event) {
//     let pos = getCursorPosition(can, event);
//
//     let x = Math.round(pos.x / 10);
//     let y = Math.round(pos.y / 10);
//     return {x: x, y: y};
// }

const canvas = {
    getCursorPosition(can, event) {
        var rect = can.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return {x: x, y: y};
    },
    init(initCf) {
        cf = initCf;
        window.requestAnimationFrame(canvas.draw);
    },
    calcCellIdByPos({x, y}) {
        let newX = Math.round(x / 10);
        let newY = Math.round(y / 10);
        return {'x': newX, 'y': newY};
    },

    click(clickHandlerFnc) {
        clickHandler = clickHandlerFnc;
        let elem = document.getElementById(cf.element);
        elem.addEventListener('click', (event) => {
            let xY = canvas.getCursorPosition(elem, event);
            // console.log('xy', xY, getElementPosition(elem, event));
            let c = canvas.calcCellIdByPos(xY);
            let cell = M.getCellByPos(c);
            console.log('click', xY, c, cell);
            if (cell) {
                console.log('cell', cell);
                cell.a = 2;
                M.updateCell(cell);
                clickHandlerFnc(cell);
            }

        });
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
            if (p.a === 2) {
                ctx.fillStyle = 'red';
            }
            ctx.fill();
        });
        ctx.restore();

        window.requestAnimationFrame(canvas.draw);
    }
}

export default canvas;
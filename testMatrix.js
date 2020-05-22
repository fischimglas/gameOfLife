const _ = require('lodash');
const gMatrix = require('./gameOfLife/matrix');


let m = gMatrix.init(5, 5, function (cell) {
    cell.a = Boolean(_.random(0, 1));
    return cell;
});

// console.log(m);
console.log(m.getSurroundingCells({x: 1, y: 1}));
const _ = require('lodash');

const gGameOfLife = require('./gameOfLife/gameoflife');
const GOL = gGameOfLife.init({width: 5, height: 5, cellsize: 1});
GOL.awakeRandomCells();
GOL.setSpeed(5);
GOL.onTick(tick => {
    console.log('TICK', GOL.cells());
});

GOL.start();
const _ = require('lodash');
const MATRIX = require('./matrix');
const CANVAS = require('./canvas');

/**
 * Game Of Life, by John Conway
 */
class gameOfLifeCore {
    /**
     *
     * @param cf {width,height,cellsize,speed}
     */
    constructor(cf) {
        this.isRunning = false;
        this.tickIndex = 0;
        this.tickTime = 10;
        this.tickTimeout = null;
        this.liveActivity = null;
        this.subscribers = [];

        // Initiate Matrix
        let dim = gameOfLife.amountOfCells(cf);
        this.matrix = MATRIX.init(dim.w, dim.h, cell => {
            cell.a = false;
            return cell;
        });

        this.setSpeed(cf.speed);
    }

    start() {
        console.log('Start');
        if (!this.tickTimeout) {
            // console.warn('Start Game of Life');
            this.isRunning = true;
            this.tick();
            this.eventCalls('start');
        }
    }

    activity() {
        return this.liveActivity;
    }

    awakeRandomCells() {
        let update = [];
        this.matrix.get().forEach(cell => {
            cell.a = Boolean(_.random(0, 1));
            update.push(cell);
        });
        this.matrix.update(update);
    }

    /**
     * Call Subscriber handler for an event
     *
     * @param event
     * @param payLoad
     * @return {any[]}
     */
    eventCalls(event, payLoad) {
        return this.subscribers.filter(s => s.event === event).map(s => s.handler(payLoad));
    }

    addEventListener(event, handler) {
        console.log('addEventListener', event);
        return this.subscribers.push({event: event, handler: handler});
    }

    /**
     * Add on tick handler
     * @param handler
     */
    onTick(handler) {
        this.addEventListener('tick', handler);
    }

    stop() {
        console.log('Stop');
        this.isRunning = false;
        clearTimeout(this.tickTimeout);
        this.tickTimeout = null;
        // console.warn('Stop Game of Life');
        this.eventCalls('stop');
    }

    setSpeed(speed) {
        console.log('setSpeed', speed);
        this.tickTime = (1200 / 10 * speed);

        this.eventCalls('setSpeed', speed);
    }

    addForm(positions) {
        console.log('addForm', positions);
        _.each(positions, pos => {
            let cell = this.matrix.cellByPos(pos);
            if (cell) {
                this.matrix.cellByPos(pos).a = true;
            } else {
                console.log('cell not found');
            }
        });
        this.eventCalls('addForm', positions);
    }

    tick() {
        this.tickIndex += 1;
        let update = gameOfLife.calculateCells(this.matrix);
        this.liveActivity = _.size(_.values(update));

        // console.warn('Tick Game of Life', this.activity());
        this.matrix.update(update);

        this.eventCalls('tick', this.tickIndex);

        this.tickTimeout = setTimeout(() => {
            if (this.isRunning) {
                this.tick();
            }
        }, this.tickTime);
    }

    setReadDataHandler(readDataFnc) {
        this.readDataFnc = readDataFnc;
    }

    clear() {
        this.stop();
        this.matrix.get().map(it => it.a = false);
        this.start();
    }

    cells() {
        return this.matrix.get();
    }
}

const gameOfLife = {

    init(cf) {
        cf = _.defaults((cf || {}), {
            autostart: false,
            visual: false,

            // If with visual
            elementId: null,
            width: 10,
            height: 10,
            speed: 1,
            cellsize: 1
        });

        let Game = new gameOfLifeCore(cf);

        // Visual
        if (cf.visual === true) {
            let can = CANVAS.init(cf);
            can.setReadDataHandler(() => Game.matrix.get());
        }

        if (cf.autostart) {
            Game.start();
        }

        return Game;
    },

    amountOfCells({width, height, cellsize}) {

        // Amount of Cells
        let w = Math.ceil(width / cellsize);
        let h = Math.ceil(height / cellsize);
        return {w, h};
    },

    /**
     * Game Of Life, by John Conway
     *
     * Update Matrix State according to Game of Life Rules
     *
     * - Any live cell with fewer than two live neighbours dies, as if by underpopulation.
     * - Any live cell with two or three live neighbours lives on to the next generation.
     * - Any live cell with more than three live neighbours dies, as if by overpopulation.
     * - Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     *
     * - Any live cell with two or three live neighbours survives.
     * - Any dead cell with three live neighbours becomes a live cell.
     * - All other live cells die in the next generation. Similarly, all other dead cells stay dead.
     */
    calculateCells(matrix) {

        let cells = matrix.get();
        // console.log('Before Update', cells.filter(it => it.a === true).length);
        let update = [];
        _.each(cells, cell => {
            if (cell && MATRIX.key(cell)) {
                let nCells = matrix.getSurroundingCells(cell);

                // How Many Cells are alive ?
                let cellsAlive = _.sum(_.map(nCells, it => it.a === true ? 1 : 0));
                // console.log(cell.x, cell.y, cellsAlive);
                let newState = cell.a;

                // Currently Alive
                if (cell.a === true) {
                    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                    if (cellsAlive < 2) newState = false;
                    // Any live cell with two or three live neighbours lives on to the next generation.
                    else if (cellsAlive === 2 || cellsAlive === 3) newState = true;
                    // Any live cell with more than three live neighbours dies, as if by overpopulation.
                    else if (cellsAlive > 3) newState = false;
                    // Cell is currently dead
                } else if (cell.a === false) {
                    if (cellsAlive === 3) newState = true;
                }

                if (cell.a !== newState) {
                    update[MATRIX.key(cell)] = newState;
                }
            }
        });
        return update;
    }
};
module.exports = gameOfLife;
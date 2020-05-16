import _ from 'lodash';
import $store from './store';
import M from './matrix';

class gameoflife {
    constructor(matrix) {
        console.warn('New Game of Life');
        this.isRunning = false;
        this.tickTime = 1200;
        this.matrix = matrix;
        this.tickTimeout = null
        // this.start();
    }

    start() {
        if(!this.tickTimeout) {
            console.warn('Start Game of Life');
            this.isRunning = true;
            this.tick();
        }
    }

    stop() {
        clearTimeout(this.tickTimeout);
        this.tickTimeout = null;
        console.warn('Stop Game of Life');
        this.isRunning = false;
    }

    setSpeed(speed) {
        this.tickTime = (1200 / 10 * speed);
    }

    tick() {
        let update = G.calculateCells(this.matrix);
        console.warn('Tick Game of Life', this.matrix.update(update));
        this.matrix.update(update);
        this.tickTimeout = setTimeout(() => {
            if (this.isRunning) {
                this.tick();
            }
        }, this.tickTime);
    }

    setReadDataHandler(readDataFnc) {
        this.readDataFnc = readDataFnc;
    }
}

const G = {

    newGame(matrix) {
        return new gameoflife(matrix)
    },

    // tick() {
    //     let update = this.update(M.get());
    //     M.update(update);
    //
    //     setInterval(() => {
    //
    //         if (this.isRunning) {
    //             this.tick();
    //         }
    //     }, this.cickTime);
    // },

    /**
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
        console.log('Before Update', cells.filter(it => it.a === true).length);
        let update = [];
        _.each(cells, p => {
            if (p && M.key(p)) {
                let nCells = matrix.getSurroundingCells(p);

                // How Many Cells are alive ?
                let cellsAlive = _.sum(_.map(nCells, it => it.a === true ? 1 : 0));
                // console.log(p.x, p.y, cellsAlive);
                let newState = p.a;
                /**
                 * GAME OF LIFE rules
                 */
                // Currently Alive
                if (p.a === true) {
                    // Any live cell with fewer than two live neighbours dies, as if by underpopulation.
                    if (cellsAlive < 2) newState = false;
                    // Any live cell with two or three live neighbours lives on to the next generation.
                    else if (cellsAlive === 2 || cellsAlive === 3) newState = true;
                    // Any live cell with more than three live neighbours dies, as if by overpopulation.
                    else if (cellsAlive > 3) newState = false;
                    // Cell is currently dead
                } else if (p.a === false) {
                    if (cellsAlive === 3) newState = true;
                }

                if (p.a !== newState) {
                    update[M.key(p)] = newState;
                }
            }
        });
        return update;
    }

};

export default G;
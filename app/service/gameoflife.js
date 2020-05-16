import _ from 'lodash';
import $store from './store';
import M from './matrix';

const gameOfLife = {

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
    update(matrix) {

        let update = _.map(matrix, p => {
            let cells = M.getSurroundingCells(p);
            // How Many Cells are alive ?
            let cellsAlive = _.sum(_.map(cells, it => it.a ? 1 : 0));
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
                else if (cellsAlive > 3 ) newState = false;
            }
            // Cell is currently dead
            else {
                // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
                if (cellsAlive === 3) newState = true;
            }
            return newState;
        });
        return update;
    }

};

export default gameOfLife;
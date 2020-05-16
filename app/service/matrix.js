import _ from 'lodash';
import $store from './store';

const matrix = {
    get() {
        return $store.state.matrix;
    },
    getCell(x, y) {
        return $store.state.matrix.find(it => it.x === x && it.y === y);
    },
    set(matrix) {
        return $store.commit('setMatrix', matrix);
    },
    update(update) {
        return $store.commit('updateMatrix', update);
    },

    /**
     * Get cells around one
     * @param cell
     * @return {Array}
     */
    getSurroundingCells(cell) {
        let cells = [];
        cells.push(this.getCell(cell.x, cell.y - 1));
        cells.push(this.getCell(cell.x - 1, cell.y - 1));
        cells.push(this.getCell(cell.x - 1, cell.y));
        cells.push(this.getCell(cell.x, cell.y + 1));
        cells.push(this.getCell(cell.x + 1, cell.y + 1));
        cells.push(this.getCell(cell.x + 1, cell.y));
        return cells.filter(it => _.isObject(it));
    },

    /**
     *
     * @param size
     * @return {Array}
     */
    create(size) {
        let m = [];
        _.times(size, x => {
            _.times(size, y => {
                m.push({x: x, y: y, a: Boolean(_.random(0, 1))});
            });
        });
        return m;
    },


};

export default matrix;
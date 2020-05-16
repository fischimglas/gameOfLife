import _ from 'lodash';
import $store from './store';

let matrixData = {};

const matrix = {
    get() {
        return _.values(matrixData);
    },
    getCell(x, y) {
        return matrixData[x + 'X' + y];
    },
    init(size) {
        this.clear();
        let tmp = this.create(size);
        _.each(tmp, p => {
            matrixData[p.x + 'X' + p.y] = p;
        });
    },
    clear() {
        _.each(matrixData, (p, i) => {
            delete matrixData[i];
        });
    },
    update(update) {
        let keys = _.keys(matrixData);
        update.map((up, ix) => {
            let currentKy = keys[ix];
            matrixData[currentKy].a = up;
        });
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

window.M = matrix;
export default matrix;
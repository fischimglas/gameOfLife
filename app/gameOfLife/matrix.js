import _ from 'lodash';

class Matrix {
    constructor(data) {
        this.matrixData = {};
        _.each(data, it => this.matrixData[M.key(it)] = it);
    }

    get() {
        return _.values(this.matrixData);
    }

    cellByPos({x, y}) {
        if (x && y) {
            return this.matrixData[M.key({x, y})];
        }
    }

    alive() {
        return this.get().filter(it => it.a === true).length;
    }

    dead() {
        return this.get().filter(it => it.a === false).length;
    }

    update(update) {
        if (!_.isArray(update) || _.size(_.values(update)) <= 0) {
            return false;
        }
        let keys = _.keys(update);
        let values = _.values(update);
        _.each(keys, (key, ix) => {
            if (_.isObject(this.matrixData[key])) {
                this.matrixData[key].a = values[ix];
            }
        });
    }

    updateCell(update) {
        if (!update || update.length <= 0) {
            return false;
        }
        let c = this.cellByPos(update);
        _.each(update, (up, idx) => c[idx] = up);
    }

    /**
     * Get cells around one
     * @param cell
     * @return {Array}
     */
    getSurroundingCells({x, y}) {
        if (!x || !y) {
            return false;
        }
        let cells = [];
        cells.push(this.cellByPos({x: x, y: y - 1}));
        cells.push(this.cellByPos({x: x - 1, y: y - 1}));
        cells.push(this.cellByPos({x: x - 1, y: y}));
        cells.push(this.cellByPos({x: x, y: y + 1}));
        cells.push(this.cellByPos({x: x + 1, y: y + 1}));
        cells.push(this.cellByPos({x: x + 1, y: y}));
        return cells.filter(it => _.isObject(it));
    }
}

const M = {
    /**
     * @param x
     * @param y
     * @return {string}
     */
    key({x, y}) {
        if (x && y) {
            return x + 'X' + y;
        }
    },
    /**
     * Create new Matrix
     *
     * @param cellsHorizontal
     * @param cellsVertical
     */
    init(cellsHorizontal, cellsVertical) {
        let cells = this.createCells(cellsHorizontal, cellsVertical);
        return new Matrix(cells);
    },

    /**
     * Translate pos from a list of poisitions
     *
     * @param x
     * @param y
     * @param positions
     * @return {*}
     */
    translatePositions(x, y, positions) {
        return positions.map(it => {
            return {x: (x + it.x), y: (x + it.y)}
        })
    },

    /**
     * Create Cells
     *
     * @param w
     * @param h
     * @return {Array}
     */
    createCells(w, h) {
        let m = [];
        _.times(w, x => {
            _.times(h, y => {
                m.push({x: x, y: y, a: Boolean(_.random(0, 1))});
            });
        });
        return m;
    }

};

export default M;
const _ = require('lodash');

class Matrix {
    constructor(data) {
        this.matrixData = {};
        _.each(data, it => this.matrixData[M.key(it)] = it);
    }

    get() {
        return _.values(this.matrixData);
    }

    cellByPos({x, y}) {
        if (x >= 0 && y >= 0) {
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
        if (x <= 0 || y <= 0) {
            return false;
        }
        let cells = [];

        for (let x2 = -1; x2 <= 1; x2 += 1) {
            for (let y2 = -1; y2 <= 1; y2 += 1) {
                if (!(x2 === 0 && y2 === 0)) {
                    cells.push(this.cellByPos({x: x + x2, y: y + y2}));
                }
            }
        }
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
        if (x >= 0 && y >= 0) {
            return x + 'X' + y;
        }
    },
    /**
     * Create new Matrix
     *
     * @param cellsHorizontal
     * @param cellsVertical
     * @param cellHandler function
     */
    init(cellsHorizontal, cellsVertical, cellHandler) {
        let cells = this.createCells(cellsHorizontal, cellsVertical, cellHandler);
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
     * @param cellHandler
     * @return {Array}
     */
    createCells(w, h, cellHandler) {
        let m = [];
        _.times(w, x => {
            _.times(h, y => {
                let cell = {x: x, y: y};
                if (cellHandler) {
                    cell = cellHandler(cell);
                }
                m.push(cell);
            });
        });
        return m;
    }

};

module.exports = M;

import M from "./service/matrix";
import G from "./service/gameoflife";
import _ from 'lodash';

const DEV = {

    init() {
        let matrix = M.init(10, 10);

        console.log('matrix', matrix);
        console.log('matrix alive', matrix.alive());
        console.log('matrix dead', matrix.dead());




        // let GOL = G.newGame(matrix);
        let update = G.calculateCells(matrix);
        matrix.update(update);

        console.log('update', update);


    }
}

DEV.init();
window.M = M;
window.DEV = DEV;
export default DEV;
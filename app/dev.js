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
        // GOL.start();

        let test = matrix.getSurroundingCells({x:10,y:10});
        let update = _.map(test, cell => {
            return 2;
        })
        matrix.update(update);
    }
}

DEV.init();
window.M = M;
window.DEV = DEV;
export default DEV;
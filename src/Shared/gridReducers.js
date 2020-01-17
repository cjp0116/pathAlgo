import {
   GET_INITIAL_GRID,
   GET_NEW_GRID_WITH_WALL_TOGGLED,
   CLEAR_PATH,
   GET_START_NODE,
   GET_FINISH_NODE
} from "../actions/actionTypes";



const initialState = {
   grid: [],
   startNode: undefined,
   finishNode: undefined,
   START_NODE_ROW: 10,
   START_NODE_COL: 15,
   FINISH_NODE_COL: 35,
   FINISH_NODE_ROW: 10
};

function createNode(col, row) {
   return {
      col: col,
      row: row,
      isStart: row === initialState.START_NODE_ROW && col === initialState.START_NODE_COL,
      isFinish: col === initialState.FINISH_NODE_COL && row === initialState.FINISH_NODE_ROW,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null
   };
}

const gridReducer = (state = initialState, action) => {
   switch (action.type) {
      case GET_INITIAL_GRID:
         const iniitGrid = [...state.grid];
         for (let row = 0; row < 20; row++) {
            const curRow = [];
            for (let col = 0; col < 50; col++) {
               curRow.push(createNode(col, row));
            }
            iniitGrid.push(curRow);
         }
         return {
            ...state,
            grid: iniitGrid
         };

      case GET_NEW_GRID_WITH_WALL_TOGGLED:
         const newGrid = [...state.grid];
         const node = newGrid[action.row][action.col];
         const newNode = {
            ...node,
            isWall: !node.isWall
         };
         newGrid[action.row][action.col] = newNode;
         return {
             ...state,
             grid : newGrid
         }

      case CLEAR_PATH:
         let copied = [...state.grid];
         copied = [...action.grid];
         return {
             ...state,
             grid : copied
         }

      case GET_FINISH_NODE:
         let prevGrid = [...state.grid];
         const finishNode = prevGrid[state.FINISH_NODE_ROW][state.FINISH_NODE_COL];
        return {
            ...state,
            finishNode : finishNode
        }

      case GET_START_NODE:
         let grid = [...state.grid];
         const startNode = grid[state.START_NODE_ROW][state.START_NODE_COL];
         return {
            ...state,
            startNode,
         };
      default:
         return state;
   }
};

export default gridReducer;

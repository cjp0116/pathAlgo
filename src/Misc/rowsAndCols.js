import { Flag } from "semantic-ui-react";

export const START_NODE_ROW = 10;
export const START_NODE_COL = 15;
export const FINISH_NODE_ROW = 10;
export const FINISH_NODE_COL = 35;

export const getInitialGrid = () => {
    const grid = [];
    for(let row = 0; row < 20; row++) {
        const curRow = [];
        for(let col = 0; col < 50; col++) {
            curRow.push(createNode(col, row))
        };
        grid.push(curRow)
    }
    return grid;
}

export const getNewGridWithWallToggled = (grid, row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    const newNode = {
        ...node,
        isWall : !node.isWall
    };
    newGrid[row][col] = newNode;
    return newGrid;
}

export const createNode = (col, row) => {
    return {
        col : col,
        row : row,
        isStart : row === START_NODE_ROW && col === START_NODE_COL,
        isFinish : col === FINISH_NODE_COL && row === FINISH_NODE_ROW,
        distance : Infinity,
        isVisited : false,
        isWall : false,
        previousNode : null
    }
}


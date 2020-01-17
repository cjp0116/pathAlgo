import {
    GET_INITIAL_GRID,
    GET_NEW_GRID_WITH_WALL_TOGGLED,
    CLEAR_PATH,
    GET_START_NODE,
    GET_FINISH_NODE
} from "./actionTypes";

export const getInitialGrid = () => {
    return {
        type : GET_INITIAL_GRID
    }
};

export const getNewGridWithWallToggled = (grid, row, col) => {
    return {
        type : GET_NEW_GRID_WITH_WALL_TOGGLED,
        grid : grid,
        row : row,
        col : col
    }
};

export const clearPath = () => {
    const newGrid = getInitialGrid()
    return {
        type : CLEAR_PATH,
        grid : newGrid
    }
}

export const getStartNode = () => {
    return {
        type : GET_START_NODE
    }
}

export const getFinishNode = () => {
    return {
        type : GET_FINISH_NODE
    }
};

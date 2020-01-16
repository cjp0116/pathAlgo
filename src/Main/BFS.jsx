import React, { Component } from "react";
import Node from "./Node/Node";
import NavBar from "./Header/NavigationBar";
import Modal from "../Shared/components/UIElements/Modal";
import "./Main.css";

const START_NODE_ROW = 10;
const START_NODE_COL = 15;
const FINISH_NODE_ROW = 10;
const FINISH_NODE_COL = 35;

class BFS extends Component {
   constructor(props) {
      super(props);
      this.state = {
         grid: [],
         mouseIsPressed: false,
         showModal : true
      };
   }

   componentWillMount() {
      this.setState({ grid: [] });
      const grid = getInitialGrid();
      this.setState({ grid });
   }

   handleMouseDown(row, col) {
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({ grid: newGrid, mouseIsPressed: true });
   }

   handleMouseEnter(row, col) {
      if (!this.state.mouseIsPressed) return;
      const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
      this.setState({
         grid: newGrid
      });
   }
   closeModalHandler() {
       this.setState({ showModal : false })
   }
   render() {
      return (
         <React.Fragment>
            <Modal 
               show={this.state.showModal}
               onCancel={() => this.closeModalHandler()}
               header="BFS"
            >
               <div>
                  Briefly explain BFS
                  add button on the bottom to close.
               </div>
            </Modal>
            <NavBar
               onVisiualizePressed={() => {}}
               onClearPathPressed={() => {}}
            />

            <div className="grid">
               {this.state.grid.map((row, rowIdx) => {
                  return (
                     <div key={rowIdx}>
                        {row.map((row, rowIdx) => {
                           return (
                              <Node
                                 key={rowIdx}
                                 col={row.col}
                                 isFinish={row.isFinish}
                                 isStart={row.isStart}
                                 isWall={row.isWall}
                                 row={row.row}
                              />
                           );
                        })}
                     </div>
                  );
               })}
            </div>
         </React.Fragment>
      );
   }
}

const getInitialGrid = () => {
   const grid = [];
   for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
         currentRow.push(createNode(col, row));
      }
      grid.push(currentRow);
   }
   return grid;
};

const createNode = (col, row) => {
   return {
      col: col,
      row: row,
      isStart: row === START_NODE_ROW && col === START_NODE_COL,
      isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousNode: null
   };
};

const getNewGridWithWallToggled = (grid, row, col) => {
   const newGrid = grid.slice();
   const node = newGrid[row][col];
   const newNode = {
      ...node,
      isWall: !node.isWall
   };
   newGrid[row][col] = newNode;
   return newGrid;
};

export default BFS;

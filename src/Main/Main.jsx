import React, { Component, useState } from "react";
import Node from "./Node/Node";
import NavigationBar from "./Header/NavigationBar";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/dijkstra";
import {
   getInitialGrid,
   getNewGridWithWallToggled,
   clearPath,
   getStartNode,
   getFinishNode
} from "../Shared/actions/gridActions";

import Modal from "../Shared/components/UIElements/Modal";
import Button from "../Shared/components/UIElements/Button";
import ModalText, { djikstraText } from "../Misc/ModalTexts";
import { connect } from "react-redux";

import "./Main.css";

class Main extends Component {
   constructor(props) {
      super(props);
      this.state = {
         mouseIsPressed: false,
         route: "home",
         showModal: true
      };
   }
   componentDidMount() {
      this.props.getInitialGrid();
      this.props.getStartNode();
      this.props.getFinishNode();
   }

   handleMouseDown(row, col) {
      const { getNewGridWithWallToggled, grid } = this.props;
      getNewGridWithWallToggled(grid, row, col);
      this.setState({ mouseIsPressed: true });
   }

   handleMouseEnter(row, col) {
      if (!this.state.mouseIsPressed) return;
      else this.props.getNewGridWithWallToggled(this.props.grid, row, col);
   }

   handleMouseUp() {
      this.setState({ mouseIsPressed: false });
   }

   animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
      for (let i = 0; i <= visitedNodesInOrder.length; i++) {
         if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
               this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
         }
         setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
               "node node-visited";
         }, 10 * i);
      }
   }

   animateShortestPath(nodesInShortestPathOrder) {
      for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
         setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
               "node node-shortest-path";
         }, 50 * i);
      }
   }

   visualizeDijkstra() {
      const { grid, startNode, finishNode } = this.props;
      const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
      const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
      this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
   }

   clearPath() {
      const grid = getInitialGrid();
      this.setState({ grid: [] });
      this.setState({ grid: grid });
   }

   handleRouteChange = route => {
      this.setState({
         route: route
      });
      console.log(this.state.route);
   };

   closeModalHandler() {
      this.setState({ showModal: false });
   }

   render() {
      const { mouseIsPressed } = this.state;
      const { grid } = this.props;
      return (
         <div>
            <NavigationBar
               onVisiualizePressed={() => this.visualizeDijkstra()}
               onClearPathPressed={() => this.props.clearPath()}
               onRouteChange={() => this.handleRouteChange()}
            />
            <Modal
               show={this.state.showModal}
               onCancel={() => this.closeModalHandler()}
               header="Djikstra's Algorithm"
               headerClass="center"
               footerClass="center"
               footer={
                  <React.Fragment>
                     <Button danger onClick={() => this.closeModalHandler()}>
                        Close
                     </Button>
                     <Button>Next</Button>
                  </React.Fragment>
               }
            >
               <div className="center"><ModalText djikstraText /></div>
            </Modal>
            <div className="grid">
               {grid.map((row, rowIdx) => {
                  return (
                     <div key={rowIdx}>
                        {row.map((node, nodeIdx) => {
                           const { row, col, isFinish, isStart, isWall } = node;
                           return (
                              <Node
                                 key={nodeIdx}
                                 col={col}
                                 isFinish={isFinish}
                                 isStart={isStart}
                                 isWall={isWall}
                                 mouseIsPressed={mouseIsPressed}
                                 onMouseDown={(row, col) =>
                                    this.handleMouseDown(row, col)
                                 }
                                 onMouseEnter={(row, col) =>
                                    this.handleMouseEnter(row, col)
                                 }
                                 onMouseUp={() => this.handleMouseUp()}
                                 row={row}
                              ></Node>
                           );
                        })}
                     </div>
                  );
               })}
            </div>
         </div>
      );
   }
}

const mapStateToProps = state => {
   return {
      grid: state.grid,
      START_NODE_ROW: state.START_NODE_ROW,
      START_NODE_COL: state.START_NODE_COL,
      FINISH_NODE_COL: state.FINISH_NODE_COL,
      FINISH_NODE_ROW: state.FINISH_NODE_ROW,
      startNode: state.startNode,
      finishNode: state.finishNode
   };
};

const mapDispatchToProps = dispatch => {
   return {
      getInitialGrid: () => dispatch(getInitialGrid()),
      getNewGridWithWallToggled: (grid, row, col) =>
         dispatch(getNewGridWithWallToggled(grid, row, col)),
      clearPath: () => dispatch(clearPath()),
      getFinishNode: () => dispatch(getFinishNode()),
      getStartNode: () => dispatch(getStartNode())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

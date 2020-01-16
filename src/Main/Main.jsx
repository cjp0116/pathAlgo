import React, { Component } from "react";
import Node from "./Node/Node";
import NavigationBar from "./Header/NavigationBar";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/dijkstra";
import {
  START_NODE_ROW,
  START_NODE_COL,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
  getInitialGrid,
  getNewGridWithWallToggled

} from "../Misc/rowsAndCols";
import Modal from "../Shared/components/UIElements/Modal";
import Button from "../Shared/components/UIElements/Button";
import {djikstraText} from "../Misc/ModalTexts";
import "./Main.css";


export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
      route : "home",
      showModal : true
    };
  }

  componentDidMount() {
    this.setState({ grid : [] })
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
    this.setState({ grid: newGrid });
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
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  clearPath() {
    const grid = getInitialGrid();
    this.setState({ grid : [] });
    this.setState({ grid : grid})
  }
  
  handleRouteChange = (route) => {
    this.setState({
      route : route
    })
    console.log(this.state.route)
  }

  closeModalHandler() {
    this.setState({ showModal : false })
  }
  
  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <div>
        <NavigationBar
          onVisiualizePressed={() => this.visualizeDijkstra()}
          onClearPathPressed={() => this.clearPath()}
          onRouteChange={() => this.handleRouteChange()}
        />
        <Modal 
          show={this.state.showModal}
          onCancel={() => this.closeModalHandler()}
          header="Djikstra's Algorithm"
          headerClass="center"
          footer={<Button danger onClick={() => this.closeModalHandler()}>Close</Button>}
        >
          <div className="center">
            {djikstraText}
          </div>
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
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
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
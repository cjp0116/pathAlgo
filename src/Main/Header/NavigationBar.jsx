import React, { Component } from "react";
import { NavLink, BrowserRouter } from "react-router-dom";
import {
   Container,
   Divider,
   Dropdown,
   Grid,
   Header,
   Image,
   List,
   Menu,
   Button,
   Segment
} from "semantic-ui-react";

export default class NavigationBar extends Component {
   constructor(props) {
      super(props);
      this.state = {};
   }

   hideFixedMenu = () => this.setState({ fixed: false });
   showFixedMenu = () => this.setState({ fixed: true });

   render() {
      const { fixed } = this.state;
      const {
         onVisiualizePressed,
         onClearPathPressed,
         onRouteChange
      } = this.props;
      return (
         <BrowserRouter>
            <Menu fixed="top" inverted style={{ backgroundColor: "#061830" }}>
               <Container>
                  <Menu.Item as="a" header>
                     <Image
                        size="mini"
                        src={require("../../assets/path-algo-icon.png")}
                        style={{ marginRight: "1.5em" }}
                     />
                     Path Algorithm Visualizer
                  </Menu.Item>
                  <Menu.Item as="a" onClick={() => onRouteChange("home")}>
                     Home
                  </Menu.Item>

                  <Dropdown item simple text="Dijkstra's Algorithm">
                     <Dropdown.Menu>
                        <NavLink to="/bfs">
                           <Dropdown.Item>
                              BFS
                           </Dropdown.Item>
                        </NavLink>

                        <Dropdown.Item>List Item</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Header>Header Item</Dropdown.Header>
                        <Dropdown.Item>
                           <i className="dropdown icon" />
                           <span className="text">Submenu</span>
                           <Dropdown.Menu>
                              <Dropdown.Item>List Item</Dropdown.Item>
                              <Dropdown.Item>List Item</Dropdown.Item>
                           </Dropdown.Menu>
                        </Dropdown.Item>
                        <Dropdown.Item>List Item</Dropdown.Item>
                     </Dropdown.Menu>
                  </Dropdown>
                  <Menu.Item position="right">
                     <Button
                        style={{ marginRight: 16 }}
                        onClick={() => onClearPathPressed()}
                     >
                        Clear Path
                     </Button>

                     <Button color="blue" onClick={() => onVisiualizePressed()}>
                        Visualize Algorithm
                     </Button>
                  </Menu.Item>
               </Container>
            </Menu>
         </BrowserRouter>
      );
   }
}

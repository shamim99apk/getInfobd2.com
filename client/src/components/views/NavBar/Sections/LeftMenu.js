import React from "react";
import { Menu } from "antd";

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <Menu.Item key='mail'>
        <a href='/'>Home</a>
      </Menu.Item>

      <Menu.Item key='mail'>
        <a href='/grocery'>Grocery</a>
      </Menu.Item>
      <Menu.Item key='mail'>
        <a href='/blood'>Blood</a>
      </Menu.Item>
      <Menu.Item key='mail'>
        <a href='/volunteer'>Volunteer</a>
      </Menu.Item>
      <Menu.Item key='mail'>
        <a href='/police'>Police</a>
      </Menu.Item>
    </Menu>
  );
}

export default LeftMenu;

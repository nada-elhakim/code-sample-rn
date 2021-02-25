import React from 'react';
import Colors from "../../theme/variables/Colors";
import UseChainIcon from "../UseChainIcon/UseChainIcon";

export default class TabBarIcon extends React.Component {
  render() {
      const {
          name,
          size = 24
      } = this.props;
      return (
      <UseChainIcon
        name={name}
        size={size}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.primaryDark : Colors.light}
      />
    );
  }
}
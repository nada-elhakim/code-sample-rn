import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, Platform, Dimensions } from "react-native";
import Colors from "../../variables/Colors";

class Container extends Component {
    render() {
        return (
            <View ref={c => (this._root = c)} {...this.props} style={[styles.container, this.props.style]}>
                {this.props.children}
            </View>
        );
    }
}

export default Container;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.containerColor,
        flex: 1
    }
});
import React, { Component } from "react";
import { View, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import { ToastContainer as Toast } from "../Toast/ToastContainer";

class Root extends Component {
    render() {
        return (
            <View ref={c => (this._root = c)} {...this.props} style={{ flex: 1 }}>
                {this.props.children}
                <Toast
                    ref={c => {
                        if (c) Toast.toastInstance = c;
                    }}
                />
            </View>
        );
    }
}

Root.propTypes = {
    ...ViewPropTypes,
    style: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.number,
        PropTypes.array
    ])
};

export {Root};
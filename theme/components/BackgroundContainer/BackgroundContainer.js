import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    KeyboardAvoidingView,
    StyleSheet,
    Platform,
    Dimensions,
    ScrollView,
    ImageBackground
} from "react-native";
import Container from "../Container/Container";

const {height, width} = Dimensions.get("window");

class BackgroundContainer extends Component {
    // static propTypes = {
    //     source: PropTypes.object
    // };

    render() {
        return (
            <Container>
                <ImageBackground source={this.props.source} style={{width, height}}>
                    {this.props.children}
                </ImageBackground>
            </Container>
        );
    }
}

export default BackgroundContainer;




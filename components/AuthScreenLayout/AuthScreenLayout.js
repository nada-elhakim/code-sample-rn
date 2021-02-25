import React, { Component } from "react";
import PropTypes from "prop-types";
import {
    View,
    Platform,
    Dimensions,
    StyleSheet,
    Text
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AppBackground from "../AppBackground/AppBackground";
import Content from "../../theme/components/Content/Content";
import AppLogo from "../AppLogo/AppLogo";
import NavigationService from "../../navigation/NavigationService";
import Button from "../../theme/components/Button/Button";
import Colors from "../../theme/variables/Colors";

const deviceHeight = Dimensions.get("window").height;


const AuthScreenLayout = (props) => {
    const {linkTitle, linkRoute, children} = props;

    const renderPageLink = () => {
        return (
            <Button
                small
                onPress={navigate}
                transparent>
                <Text style={styles.topButtonText}>{linkTitle}</Text>
                <Ionicons
                    size={24}
                    style={styles.topButtonIcon}
                    color={Colors.primary}
                    name="ios-arrow-round-forward" />
            </Button>
        )
    };

    const navigate = () => {
        NavigationService.navigate(linkRoute);
    };

    return (
        <AppBackground>
            <Content contentContainerStyle={{backgroundColor: 'transparent'}}>
                <View style={styles.container}>
                    <View style={styles.topButton}>
                        {renderPageLink()}
                    </View>
                    <View style={styles.mainContainer}>
                        <AppLogo />
                        <View style={{marginTop: 30}}>
                            {children}
                        </View>
                    </View>
                </View>
            </Content>
        </AppBackground>
    );
};

export default AuthScreenLayout;

AuthScreenLayout.propTypes = {
    linkTitle: PropTypes.string.isRequired,
    linkRoute: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 22
    },
    topButton: {
        marginTop: deviceHeight/9,
        alignSelf: 'flex-end',
        marginEnd: 30
    },
    topButtonText: {
        color: Colors.primary,
        marginRight: 14
    },
    topButtonIcon: {
        marginTop: 2
    },
    mainContainer: {
        width: '76%',
        paddingTop: deviceHeight * 0.1,
    }
});




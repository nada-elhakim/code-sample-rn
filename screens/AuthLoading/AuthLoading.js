import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    AppState, Image,
    StatusBar,
    View,
} from 'react-native';
import StartupActions from '../../redux/common/Startup/StartupRedux';
import ProfileActions from '../../redux/common/Profile/ProfileRedux';
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import Container from "../../theme/components/Container/Container";
import Images from "../../theme/variables/Images";
import Colors from "../../theme/variables/Colors";
import TypographyStyles from "../../theme/styles/TypographyStyles";

class AuthLoadingScreen extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            startup,
            startProfilePoll,
            stopProfilePoll
        } = this.props;

        startup();

        AppState.addEventListener('change', (nextAppState) => {
            if (nextAppState.match(/inactive|background/)) {
                stopProfilePoll();
            } else {
                startProfilePoll();
            }
        });
    }

    render() {
        const {t} = this.props;
        return (
            <Container style={{backgroundColor: Colors.primaryDark}}>
                {/*<StatusBar barStyle="default" />*/}
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <View style={{
                        width: '40%',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={Images.whiteLogo}
                            style={{
                                width: 80,
                                height: 87,
                                marginBottom: 10
                            }}/>
                        <Text
                            style={[
                                TypographyStyles.textClear,
                                {
                                    textAlign: 'center'
                                }]}>
                            {t('common:interface:checkingAuthStatus')}
                        </Text>
                    </View>
                </View>
            </Container>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    startup: () => dispatch(StartupActions.startup()),
    startProfilePoll: () => dispatch(ProfileActions.startProfilePoll()),
    stopProfilePoll: () => dispatch(ProfileActions.stopProfilePoll()),
});


export default connect(null, mapDispatchToProps)(withNamespaces()(AuthLoadingScreen));
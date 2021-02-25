import React, {Component} from 'react';
import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import { WebView } from 'react-native-webview';
import ProfileActions, {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";
import {connect} from "react-redux";

class Banner extends Component {
    webView;
    banner;

    static navigationOptions = ({navigation}) => {
        return {
           title: navigation.getParam('banner').title
        }
    };

    componentWillMount() {
        this.banner = this.props.navigation.getParam('banner');
        this.props.getUser();
    }

    render() {
        const {profile, user} = this.props;
        let uri;
        if (user && profile) {
            if (this.banner.external_url.match(/(usechain.net|usechain.cn)/)) {
                uri = `${this.banner.external_url}?uid=${user.uid}&token=${user.token}&mobile=${profile.phone}&setTranPwd=${user.has_trade_password ? 1 : 0}`;
            } else {
                uri = this.banner.external_url
            }
        }

        return (
            <Container>
                {/*<Content contentContainerStyle={{flex: 1}}>*/}
                    {uri && <WebView
                        ref={( webView ) => this.webView = webView}
                        source={{uri}}
                        automaticallyAdjustContentInsets={true}
                        cacheEnabled={false}
                        style={{flex: 1}}
                    />}
                {/*</Content>*/}
            </Container>
        )
    }
}

const mapStateToProps = (state) => ({
    profile: ProfileSelectors.selectProfile(state),
    user: ProfileSelectors.selectUser(state)
});

const mapDispatchToProps = (dispatch) => ({
    getUser: () => dispatch(ProfileActions.getUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
import React, {Component} from 'react';
import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import {ProfileSelectors} from "../../redux/common/Profile/ProfileRedux";
import {connect} from "react-redux";
import { WebView } from 'react-native-webview';

class H5 extends Component {
    webView;
    render() {
        const {profile} = this.props;
        return (
            <Container>
                <Content contentContainerStyle={{flex: 1}}>
                    {profile && user && <WebView
                        ref={( webView ) => this.webView = webView}
                        source={{uri: 'http://localhost:3000/'}}
                        onLoadEnd={this.sendProfile.bind(this)}
                        style={{flex: 1}}
                    />}
                </Content>
            </Container>
        )
    }

    sendProfile() {
        console.log('posting message');
        const {profile: {phone, invite_code}} = this.props;
        const data = {
            phone,
            invite_code
        };
        this.webView.postMessage(JSON.stringify(data));
    }
}

const mapStateToProps = (state) => ({
    profile: ProfileSelectors.selectProfile(state)
});

export default connect(mapStateToProps)(H5);
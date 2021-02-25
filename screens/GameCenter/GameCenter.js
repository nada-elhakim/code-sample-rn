import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet, RefreshControl
} from 'react-native';

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import {withNamespaces} from "react-i18next";
import Text from "../../theme/components/Text/Text";
import Item from "../../theme/components/Item/Item";

class GameCenter extends Component {
    componentDidMount() {

    }
    render() {
        const {
            t,
        } = this.props;
        return (
            <Container>
                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={false}
                            onRefresh={this._onRefresh}
                        />}
                >
                    <Item>
                        <Text>{t('dashboard:navigationTabs.gameCenter')}</Text>
                    </Item>
                </Content>
            </Container>
        );
    }

    _onRefresh = () => {
    };
}

export default withNamespaces()(GameCenter);

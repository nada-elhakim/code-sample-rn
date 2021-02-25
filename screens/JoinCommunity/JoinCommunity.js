import React, {Component} from 'react';
import {FlatList, View} from "react-native";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Colors from "../../theme/variables/Colors";
import Item from "../../theme/components/Item/Item";
import {withNamespaces} from "react-i18next";
import Images from "../../theme/variables/Images";
import CommunityCard from "./CommunityCard";
import Metrics from "../../theme/variables/Metrics";

class JoinCommunity extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:joinCommunity.title')
        }
    };

    socialMedia = [
        {
            id: 1,
            title: this.props.t('dashboard:joinCommunity.wechatNumber'),
            image: Images.wechatBg,
            url: 'usechain-yoyo'
        },
        {
            id: 2,
            title: this.props.t('dashboard:joinCommunity.telegramGroup'),
            image: Images.telegramBg,
            url: 'https://t.me/usechain2'
        }
    ];

    render() {
        return (
            <Container>
                <Content style={{
                    backgroundColor: Colors.contentColor,
                    padding: Metrics.defaultPadding
                }}>
                    {this.renderSocialMedia()}
                </Content>
            </Container>
        )
    }

    renderSocialMedia() {
        return this.socialMedia.map(medium => <CommunityCard socialMedia={medium} key={medium.id}/>)
    }
}

export default withNamespaces()(JoinCommunity);
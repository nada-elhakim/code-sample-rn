import React, {Component} from 'react';
import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Item from "../../theme/components/Item/Item";
import {FlatList} from "react-native";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import {withNamespaces} from "react-i18next";
import Colors from "../../theme/variables/Colors";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import Metrics from "../../theme/variables/Metrics";

class Security extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:security.title')
        }
    };

    constructor(props) {
        super(props);
        this.renderSecuritySettings = this.renderSecuritySettings.bind(this);
    }

    render() {
        const {t} = this.props;
        const securitySettings = [
            {
                id: 1,
                title: t('dashboard:security.changePassword'),
                link: 'ResetPassword',
                linkParams: {
                    intent: 'edit_pass',
                    navTitle: t('dashboard:security.changePassword')
                }
            },
            {
                id: 2,
                title: t('dashboard:security.changePin'),
                link: 'TradePassword',
                linkParams: {
                    navTitle: t('dashboard:security.changePin'),
                    intent: 'edit'
                }
            }
        ];

        return (
            <Container style={{backgroundColor: Colors.contentColor}}>
                <Content contentContainerStyle={{flex: 1}}>
                    <FlatList
                        data={securitySettings}
                        renderItem={this.renderSecuritySettings}
                        keyExtractor={item => item.id.toString()}/>
                </Content>
            </Container>
        )
    }

    renderSecuritySettings({item}) {
        return (
            <Item showArrow onPress={() => this.props.navigation.navigate(item.link, item.linkParams)}>
                <ItemHeading>{item.title}</ItemHeading>
            </Item>
        )
    }
}

export default withNamespaces()(Security);
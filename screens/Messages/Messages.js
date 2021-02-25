import React, {Component} from 'react';
import {
    View,
    Image,
    FlatList,
    StyleSheet,
    RefreshControl
} from 'react-native';
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Text from "../../theme/components/Text/Text";
import MessagesActions, {MessagesSelectors} from "./MessagesRedux";
import Item from "../../theme/components/Item/Item";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Note from "../../theme/components/Note/Note";
import LayoutStyles from "../../theme/styles/LayoutStyles";
import Colors from "../../theme/variables/Colors";
import {withNamespaces} from "react-i18next";

class Messages extends Component {
    static navigationOptions = ({screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:messages.title')
        }
    };

    pagingParams = {
        page: 1,
        per_page: 20
    };

    componentWillMount() {
        this.props.resetMessages();
        this._getMessages();
    }

    render() {
        const {
            messages
        } = this.props;
        return (
            <Container>
               {messages && this._renderMessagesList(messages)}
            </Container>
        );
    }

    _renderMessagesList(messages) {
        const {
            t,
            refreshing
        } = this.props;

        return (
            <FlatList
                refreshing={refreshing}
                onRefresh={this._onRefresh}
                data={messages.items}
                ListEmptyComponent={() => <Item><Text>{t('dashboard:messages.noMessages')}</Text></Item>}
                renderItem={this._renderMessageItem}
                keyExtractor={item => item.id.toString()}
                onEndReached={this._loadMore}
                onEndThreshold={0}
            />
        );
    }

    _renderMessageItem = ({item}) => {
        return (
            <Item>
                <View style={[LayoutStyles.spaceBetween, {marginBottom: 8}]}>
                    <ItemHeading style={{marginBottom: 0, color: Colors.textDark}}>{item.subject}</ItemHeading>
                    <Note>{item.created_at}</Note>
                </View>
                <Text>{item.content}</Text>
            </Item>
        )
    };

    _onRefresh = () => {
        this._getMessages({refreshing: true})
    };

    _getMessages = (refreshing) => {
        if (refreshing) {
            this.pagingParams.page = 1;
        }
        const {getMessages} = this.props;
        getMessages(this.pagingParams, refreshing);
    };

    _loadMore = () => {
        const {
            messages,
            getMessages
        } = this.props;
        if (messages.items.length < messages.total) {
            this.pagingParams.page++;
            getMessages(this.pagingParams);
        }
    };
}

const mapStateToProps = (state) => ({
    messages: MessagesSelectors.selectMessages(state),
    refreshing: MessagesSelectors.selectRefreshStatus(state),

});

const mapDispatchToProps = (dispatch) => ({
    getMessages: (refreshing, pagingParams) => dispatch(MessagesActions.messagesRequest(refreshing, pagingParams)),
    resetMessages: () =>  dispatch(MessagesActions.messagesReset())

});

export default connect(mapStateToProps, mapDispatchToProps)(withNamespaces()(Messages));

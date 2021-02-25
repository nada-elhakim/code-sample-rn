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
import Images from "../../theme/variables/Images";
import Text from "../../theme/components/Text/Text";
import Item from "../../theme/components/Item/Item";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Note from "../../theme/components/Note/Note";
import FullWidthImage from "react-native-fullwidth-image";
import ArticleActions, {ArticleSelectors} from "./ArticleRedux";
import SharePopupMenu from "../../components/SharePopupMenu/SharePopupMenu";
import Metrics from "../../theme/variables/Metrics";

class Article extends Component {
    articleSummary;

    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            headerRight: <SharePopupMenu/>,
            headerRightContainerStyle: {
                marginRight: Metrics.headerHorizontalMargin
            },
        }
    };

    componentWillMount() {
        this.articleSummary = this.props.navigation.getParam('articleSummary');
        this.props.getArticle(this.articleSummary);
    }

    render() {
        const {
            navigation,
            refreshing,
            article
        } = this.props;

        return (
            <Container>
                <Content
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={this._onRefresh}
                        />}
                >
                    <Item style={{paddingHorizontal: 28, paddingVertical: 30}}>
                        <ItemHeading>{article && article.title}</ItemHeading>
                        <View style={{flexDirection: 'row'}}>
                            {/*<Note style={{marginRight: Metrics.defaultMargin}}>{article.transfer}</Note>*/}
                            <Note>{article && article.created_at}</Note>
                        </View>
                    </Item>
                    <Item noBorder>
                        <Text>{article && article.excerpt}</Text>
                    </Item>
                    <Item noBorder>
                        {article && <FullWidthImage
                            source={(this.articleSummary.cover_url && this.articleSummary.cover_url !== '') ? {uri: this.articleSummary.cover_url} : Images.findBanner}
                            width={670}
                            height={280} /> }
                    </Item>

                    <Item noBorder>
                        <Text>{article && article.content}</Text>
                    </Item>
                </Content>
            </Container>
        );
    }

    _onRefresh = () => {
        this.props.getArticle(this.articleSummary, {refreshing: true});
    };
}

const mapStateToProps = (state) => ({
    article: ArticleSelectors.selectArticle(state),
    refreshing: ArticleSelectors.selectRefreshStatus(state),

});

const mapDispatchToProps = (dispatch) => ({
    getArticle: (articleSummary, refreshing) => dispatch(ArticleActions.articleRequest(articleSummary, refreshing))
});

export default connect(mapStateToProps, mapDispatchToProps)(Article);

const styles = StyleSheet.create({
    title: {
       textAlign: 'center'
    }
});
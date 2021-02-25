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
import Metrics from "../../theme/variables/Metrics";
import ArticleListItem from "./ArticleListItem";
import ArticlesActions, {ArticlesSelectors} from './ArticlesRedux';
import Banners from "../../components/Banners/Banners";
import Colors from "../../theme/variables/Colors";

class Articles extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {
            getArticles,
            getBanner,
        } = this.props;
        getArticles();
        getBanner();
    }

    render() {
        const {
            articles,
            refreshing,
            banners
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
                    {banners && banners.length > 0 &&
                    <View style={{
                        height: Metrics.bannerHeight,
                        backgroundColor: Colors.white,
                        paddingVertical: Metrics.defaultPadding
                    }}>
                        <Banners banners={banners}/>
                    </View>
                    }
                    { articles &&
                        <FlatList
                            data={articles}
                            // ListHeaderComponent={<ArticleListHeader/>}
                            renderItem={({item}) => <ArticleListItem article={item} onPress={this._goToArticle}/>}
                            keyExtractor={(item) => item.id.toString()}/>
                    }

                </Content>
            </Container>
        );
    }

    _goToArticle = (article) => {
        this.props.navigation.navigate('Article', {articleSummary: article});
    };

    _onRefresh = () => {
        this.props.getArticles({refreshing: true});
    };
}

const mapStateToProps = (state) => ({
    articles: ArticlesSelectors.selectArticles(state),
    refreshing: ArticlesSelectors.selectRefreshStatus(state),
    banners: ArticlesSelectors.selectBanners(state)
});

const mapDispatchToProps = (dispatch) => ({
    getArticles: (refreshing) => dispatch(ArticlesActions.articlesRequest(refreshing)),
    getBanner: () => dispatch(ArticlesActions.bannerRequest()),
});


export default connect(mapStateToProps, mapDispatchToProps)(Articles);

const styles = StyleSheet.create({
    homeBanner: {
        width: '100%',
        height: 90,
        marginBottom: Metrics.defaultMargin,
        borderRadius: 8
    }
});
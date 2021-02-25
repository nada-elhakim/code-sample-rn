import React from 'react';
import {View} from "react-native";
import PropTypes from 'prop-types';

import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Item from "../../theme/components/Item/Item";
import Text from "../../theme/components/Text/Text";
import Thumbnail from "../../theme/components/Thumbnail/Thumbnail";
import Note from "../../theme/components/Note/Note";
import LayoutStyles from "../../theme/styles/LayoutStyles";
import Metrics from "../../theme/variables/Metrics";
import Images from "../../theme/variables/Images";

const ArticleListItem = ({article, onPress}) => {
    return (
        <Item style={{flexDirection: 'row'}} onPress={() => onPress(article)}>

            <View style={{flexDirection: 'column', flex: 1}}>
                <ItemHeading>{article.title}</ItemHeading>
                <Text
                    style={{ marginBottom: Metrics.defaultMargin}}
                    numberOfLines={3}>
                    {article.content}
                </Text>
                <View style={LayoutStyles.spaceBetween}>
                    {/*<Note>{article.transfer}</Note>*/}
                    <Note>{article.created_at}</Note>
                </View>
            </View>
            <Thumbnail
                defaultSource={Images.article1}
                source={article.cover_url && article.cover_url !== '' ? {uri: article.cover_url}: Images.article1}
                style={{
                    marginLeft: Metrics.defaultMargin,
                    width: 100,
                    height: 75}} />
        </Item>
    );
};

export default ArticleListItem;

ArticleListItem.propTypes = {
    article: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        content: PropTypes.string,
        excerpt: PropTypes.string,
        created_at: PropTypes.string,
        cover: PropTypes.string,
    }),
    onPress: PropTypes.func
};


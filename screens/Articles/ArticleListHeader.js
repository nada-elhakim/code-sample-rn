import React from 'react';

import Images from "../../theme/variables/Images";
import Item from "../../theme/components/Item/Item";
import FullWidthImage from "react-native-fullwidth-image";

const ArticleListHeader= () => {
    return (
        <Item noBorder>
            <FullWidthImage source={Images.findBanner} width={670} height={280} />
        </Item>

    );
};

export default ArticleListHeader;



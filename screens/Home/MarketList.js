import React from 'react';
import {
    View,
    FlatList
} from "react-native";
import Item from "../../theme/components/Item/Item";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import {withNamespaces} from "react-i18next";
import MarketListItem from "./MarketListItem";

const MarketList = ({t, currencies, profile}) => {
    const renderListItems = () => {
        return (
            <FlatList
                extraData={profile}
                renderItem={({item}) => <MarketListItem profile={profile} marketValue={item}/>}
                keyExtractor={item => item.name}
                data={currencies}/>);
    };

   return (
       <View>
           <Item noBorder style={{paddingBottom: 0}}>
               <ItemHeading>{t('dashboard:home.marketValue')}</ItemHeading>
           </Item>
           {renderListItems()}
       </View>
   );
};
export default withNamespaces()(MarketList);
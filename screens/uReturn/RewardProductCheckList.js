import React, {Component} from 'react';
import {FlatList, Image} from "react-native";
import CheckBox from 'react-native-check-box';
import Item from "../../theme/components/Item/Item";
import Text from "../../theme/components/Text/Text";
import Images from "../../theme/variables/Images";
import RewardCheckListHeader from "./RewardCheckListHeader";
import TypographyStyles from "../../theme/styles/TypographyStyles";


const RewardProductCheckList = ({products, onProductSelected, profile}) =>  {
        // const {products, onProductSelected} = this.props;
    if (products.length > 0) {
        return (
            <FlatList
                ListHeaderComponent={<RewardCheckListHeader profile={profile}/>}
                data={products}
                renderItem={({item}) => <RewardProductItem product={item} onProductSelected={onProductSelected}/>}
                keyExtractor={item => item.id.toString()}
            />
        )
    } else {
        return (
            <Item noBorder>
                <Text>no products available</Text>
            </Item>
        )
    }
};


const RewardProductItem = ({product, onProductSelected}) => {
    const {name} = product;
    return(
        <Item onPress={onProductSelected.bind(this, product)}>
            <CheckBox
                style={{flex: 1, padding: 10}}
                onClick={onProductSelected.bind(this, product)}
                isChecked={product.checked}
                leftText={name}
                leftTextStyle={
                    {fontSize: 18, color : '#DAB97C'}
                }
                unCheckedImage={
                    <Image
                        source={Images.productCheckboxUnSelected}
                        style={{width: 20, height: 20}}/>
                }
                checkedImage={
                    <Image
                        source={Images.productCheckboxSelected}
                        style={{width: 20, height: 20}}/>
                }
            />
        </Item>
    )
}

export default RewardProductCheckList;

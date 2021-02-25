import React, {Component} from 'react';
import {
    FlatList,
    Modal,
    View,
    Image
} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Item from "../../theme/components/Item/Item";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Metrics from "../../theme/variables/Metrics";
import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import Images from "../../theme/variables/Images";

class CurrencyListModal extends Component {
    render() {
        const {
            currencies,
            visible,
            onModalClose
        } = this.props;
        return (
            <Modal
                visible={visible}
                animationType="slide"
                presentationStyle="overFullScreen"
            >
                <View style={{paddingTop: 40}}>
                    <Item style={{alignItems: 'flex-end'}}>
                        <Button
                            containerStyle={{
                                width: 40
                            }}
                            onPress={onModalClose}
                            headerButton
                            transparent>
                            <Ionicons
                                size={30}
                                name="ios-close-circle-outline"/>
                        </Button>
                    </Item>
                    <FlatList
                        data={currencies}
                        renderItem={this._renderCurrencyItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </View>

            </Modal>
        )
    }

    _renderCurrencyItem = ({item}) => {
        const {onCurrencySelected, selectedCurrency} = this.props;
        return (
            <Item
                noBorder
                onPress={() => onCurrencySelected(item)}
                containerStyle={item.id === selectedCurrency.id && {backgroundColor: '#f8f8f8'}}>
                <View style={[{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'}]}>
                    <Image
                        source={{uri: item.icon_url}}
                        defaultSource={Images['icon'+ item.symbol]}
                        style={{
                            height: 40,
                            width: 40
                        }}/>
                    <ItemHeading
                        uppercase
                        style={[
                            {marginLeft: Metrics.defaultMargin},
                            TypographyStyles.textDark
                        ]}>
                        {item.name}
                    </ItemHeading>
                </View>
            </Item>
        )
    }
}


export default CurrencyListModal;
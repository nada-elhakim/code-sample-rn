import React from 'react';
import Item from "../../theme/components/Item/Item";
import {Image} from "react-native";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";
import Button from "../../theme/components/Button/Button";

const CurrencySegment = ({currencies, selectedCurrency, onCurrencySelected}) => {
    const renderCurrencyItem = (item) => {
        return (
            <Button
                key={item.id.toString()}
                onPress={onCurrencySelected.bind(this, item)}
                transparent
                containerStyle={{
                    width: 100
                }}
                buttonStyle={{
                    flexDirection: 'column',
                    justifyContent: 'center',
                    height: undefined,
                    opacity: item.id === selectedCurrency.id ? 1 : 0.5
                }}
            >
                <Image
                    source={item.icon}
                    style={[{
                        width: 40,
                        height: 40,
                        marginBottom: 10
                    }, item.iconStyle && item.iconStyle]}/>
                <ItemHeading uppercase numberOfLines={1}>
                    {item.name}
                </ItemHeading>
            </Button>
        )

    };

    const renderList = () =>{
        return currencies.map(currency => renderCurrencyItem(currency))
    };

    return(
        <Item style={{flexDirection: 'row'}}>
            {renderList()}
        </Item>
    )
};

export default CurrencySegment;

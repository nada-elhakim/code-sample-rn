import React from 'react';
import {StyleSheet, View} from 'react-native';
import {withNamespaces} from "react-i18next";

import MenuItem from "./MenuItem";
import Images from "../../theme/variables/Images";
import NavigationService from "../../navigation/NavigationService";


const Menu = (props) => {
    const {t} = props;

    const menuItems = [
        {
            id: 5,
            title: t('dashboard:assets.menu.recharge'),
            image: Images.iconCharge,
            link: 'Recharge'
        },
        {
            id: 6,
            title: t('dashboard:assets.menu.coin'),
            image: Images.iconWithdraw,
            link: 'Withdraw'
        },
        {
            id: 3,
            title: t('dashboard:assets.menu.uCoin'),
            image: Images.iconUbi,
            link: 'Ucoin'
        },
        // {
        //     id: 4,
        //     title: t('dashboard:assets.menu.uReturn'),
        //     image: Images.iconUback,
        //     link: 'uReturn'
        // },
        {
            id: 1,
            title: t('dashboard:assets.menu.transaction'),
            image: Images.iconDetail,
            link: 'Transactions'
        },
        // {
        //     id: 2,
        //     title: t('dashboard:assets.menu.candyBox'),
        //     image: Images.iconCandy,
        //     link: 'Transactions'
        // },


        // {
        //     id: 7,
        //     title: t('dashboard:assets.menu.safety'),
        //     image: Images.iconSafe,
        //     link: 'Security'
        // },
        // {
        //     id: 8,
        //     title: t('dashboard:assets.menu.promotionCenter'),
        //     image: Images.iconExtension,
        //     link: 'PromotionCenter'
        // },
        // {
        //     id: 9,
        //     title: t('dashboard:assets.menu.applicationCenter'),
        //     image: Images.iconApp,
        //     link: 'Transactions'
        // },
        // {
        //     id: 10,
        //     title: t('dashboard:assets.menu.gameCenter'),
        //     image: Images.iconGame,
        //     link: 'Transactions'
        // },
        // {
        //     id: 11,
        //     title: t('dashboard:assets.menu.kyc'),
        //     image: Images.iconKyc,
        //     link: 'KYC'
        // }
    ];

    const onMenuItemPressed = (menuItem) => {
        console.log('menu item', menuItem);
        NavigationService.navigate(menuItem.link)
    };

    const renderMenuItems = () => {
        return menuItems.map((item, index) => {
            const isLast = index === menuItems.length - 1;
            return (
                <MenuItem
                    menuItem={item}
                    isLast={isLast}
                    key={item.id} />
            )
        })
    };

    return (
        <View style={styles.menuItemsContainer}>
            {renderMenuItems()}
        </View>
    );
};

export default withNamespaces()(Menu);

const styles = StyleSheet.create({
    menuItemsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap'
    }
});


import React from 'react';
import {StyleSheet, View} from 'react-native';

import {withNamespaces} from "react-i18next";
import HomeButton from "./HomeButton";
import NavigationService from "../../navigation/NavigationService";


const HomeButtons = (props) => {
    const {t} = props;

    const homeButtons = [
        {
            id: 1,
            title: t('dashboard:home.recharge'),
            icon: {
                name: 'icon-transfer-in',
                size: 30
            },
            link: 'Recharge'
        },
        // {
        //     id: 2,
        //     title: t('dashboard:home.withdraw'),
        //     icon: {
        //         name: 'icon-transfer-out',
        //         size: 30
        //     },
        //     link: 'H5'
        // },
        {
            id: 3,
            title: t('dashboard:home.transfer'),
            icon: {
                name: 'icon-transfer-station',
                size: 30
            },
            link: 'TransferStation'
        },
        {
            id: 4,
            title: t('dashboard:home.finances'),
            icon: {
                name: 'icon-finance',
                size: 30
            },
            link: 'Ucoin'
        }
    ];

    const renderButtons = () => {
        return homeButtons.map((button, index) => {
            const isLast = index === homeButtons.length - 1;
            return (
                <HomeButton
                    title={button.title}
                    onPress={() => NavigationService.navigate(button.link)}
                    icon={button.icon}
                    isLast={isLast}
                    key={button.id} />
            )
        })
    };

    return (
        <View style={styles.buttonsContainer}>
            {renderButtons()}
        </View>
    );
};

export default withNamespaces()(HomeButtons);

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }
});


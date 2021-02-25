import React from 'react';
import PropTypes from 'prop-types';

import Item from "../../theme/components/Item/Item";
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import ItemHeading from "../../theme/components/ItemHeading/ItemHeading";

const AccountItem  = ({t, profile}) => {
    return (
        <Item noBorder>
            <ItemHeading>{t('common:interface.account')}</ItemHeading>
            <Text>{profile && profile.phone}</Text>
        </Item>
    )
};

export default withNamespaces()(AccountItem);

AccountItem.propTypes = {
    profile: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        phone: PropTypes.string,
        trade_password: PropTypes.string,
        locale: PropTypes.string,
        wallet_address: PropTypes.string,
        real_name: PropTypes.string,
        id_card_number: PropTypes.string,
        id_card_front_img: PropTypes.string,
        id_card_back_img: PropTypes.string,
        kyc_verified_at: PropTypes.string,
        kyc_status: PropTypes.string,
        status: PropTypes.string,
        created_at: PropTypes.string,
        updated_at: PropTypes.string
    })
};

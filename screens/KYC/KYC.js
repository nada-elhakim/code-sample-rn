import React, {Component} from 'react';
import {reduxForm, Field} from "redux-form";
import {withNamespaces} from "react-i18next";
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Item from "../../theme/components/Item/Item";
import InputField from "../../components/InputField/InputField";
import Colors from "../../theme/variables/Colors";

import TypographyStyles from "../../theme/styles/TypographyStyles";
import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import KYCActions, {KYCSelectors} from './KYCRedux';
import ProfileActions, {ProfileSelectors} from '../../redux/common/Profile/ProfileRedux';

import {View} from "react-native";
import Metrics from "../../theme/variables/Metrics";

class KYC extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:kyc.title')
        }
    };

    componentWillMount() {
        this.props.getProfile();
    }

    render() {
        const {profile} = this.props;
        return(
            <Container>
                {profile ?
                    this._renderForm() :
                    <Text>loading data</Text>
                }
            </Container>
        );
    }

    _renderKycStatusMessage() {
        const {profile: {kyc_status}} = this.props;
        const statusName = this._getKycStatusName(kyc_status);
        return (
            <View style={{
                backgroundColor: kyc_status === 'pass' ? Colors.success : Colors.danger,
                padding: Metrics.defaultPadding
            }}>
                <Text style={[TypographyStyles.textClear]}>{statusName}</Text>
            </View>
        );
    }

    _getKycStatusName(status) {
        const {t} = this.props;
        switch (status) {
            case 'pending':
                return t('dashboard:kyc.pending');
            case 'pass':
                return t('dashboard:kyc.pass');
            default:
                return t('dashboard:kyc.fail');
        }
    }

    _renderForm() {
        const {
            t,
            handleSubmit,
            profile,
            loading
        } = this.props;

        return (
            <Content style={{backgroundColor: Colors.contentColor}}>
                {profile && <View>
                    {profile.kyc_status !== 'draft' && this._renderKycStatusMessage()}
                    <Item style={{paddingVertical: 10}}>
                        <Field
                            editable={this._isKycEditable()}
                            name="real_name"
                            noBorder
                            placeholder={t('dashboard:kyc.enterName')}
                            component={InputField}/>
                    </Item>
                    <Item style={{paddingVertical: 10}}>
                        <Field
                            editable={this._isKycEditable()}
                            name="id_card_number"
                            noBorder
                            placeholder={t('dashboard:kyc.enterId')}
                            component={InputField}/>
                    </Item>

                    { this._isKycEditable() && <Item containerStyle={{backgroundColor: 'transparent', paddingVertical: 10}}>
                        <Button
                            disabled={loading}
                            loading={loading}
                            onPress={handleSubmit(this._updateKYC)}>
                            <Text style={TypographyStyles.textClear}>
                                {t('common:interface.submit')}
                            </Text>
                        </Button>
                    </Item>}
                </View>}
            </Content>
        );
    }

    _isKycEditable() {
        const {profile} = this.props;
        return profile.kyc_status === 'fail' || profile.kyc_status === 'draft' ;
    }

    _updateKYC = ({id_card_number, real_name}) => {
        const userInfo = {
            id_card_number,
            real_name
        };
        this.props.updateKYC(userInfo);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        loading: KYCSelectors.selectLoading(state),
        profile: ProfileSelectors.selectProfile(state),
        initialValues: ProfileSelectors.selectProfile(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateKYC: (userInfo) => dispatch(KYCActions.kycRequest(userInfo)),
        getProfile: () => dispatch(ProfileActions.profileRequest({fromStorage: true}))
    }
};

const connectedReduxForm = reduxForm({
    form: 'kycForm',
    enableReinitialize: true,
})(KYC);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withNamespaces()(connectedReduxForm));

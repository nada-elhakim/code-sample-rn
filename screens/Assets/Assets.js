import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";

import Item from "../../theme/components/Item/Item";
import VipCard from "./VipCard";
import Menu from "./Menu";
import Metrics from "../../theme/variables/Metrics";
import Button from "../../theme/components/Button/Button";
import Text from "../../theme/components/Text/Text";
import Typography from "../../theme/styles/TypographyStyles";
import EvaluateActions, {EvaluateSelectors} from '../../redux/common/Evaluate/EvaluateRedux';
import {connect} from "react-redux";

class Assets extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            headerRight: (
                <Button headerButton onPress={() => navigation.navigate('Settings')}>
                    <Text style={Typography.textPrimary}>{t('dashboard:settings.title')}</Text>
                </Button>)
        }
    };

    componentDidMount() {
        this.props.getEvaluation();
    }

    render() {
        const {evaluate} = this.props;
        return (
            <Container>
                <Content>
                    <Item
                        noBorder
                        containerStyle={{
                            marginBottom: Metrics.defaultMargin
                        }}>
                        <VipCard totalAssets={evaluate && evaluate.total}/>
                    </Item>

                    <Item noBorder>
                        <Menu />
                    </Item>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => ({
    evaluate: EvaluateSelectors.selectEvaluate(state)
});

const mapDispatchToProps = (dispatch) => ({
    getEvaluation: () => dispatch(EvaluateActions.evaluateRequest()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Assets);

const styles = StyleSheet.create({

});
import React, {Component} from 'react';
import {FlatList, View} from "react-native";
import CheckBox from 'react-native-check-box'
import {connect} from "react-redux";

import Container from "../../theme/components/Container/Container";
import Content from "../../theme/components/Content/Content";
import Colors from "../../theme/variables/Colors";
import {languages} from "../../config/AppConfig";
import Item from "../../theme/components/Item/Item";
import LanguageActions, {LanguageSelectors} from './LanguageRedux';

class Language extends Component {
    static navigationOptions = ({navigation, screenProps}) => {
        const {t} = screenProps;
        return {
            title: t('dashboard:language.title')
        }
    };

    state = {
        languages
    };

    componentWillMount() {
        const {currentLanguage} = this.props;
        this._handleCheckedState(currentLanguage);
    }

    render() {
        return (
            <Container>
                <Content style={{backgroundColor: Colors.contentColor}}>
                    {this._renderLanguageList()}
                </Content>
            </Container>
        )
    }

    _renderLanguageList = () => {
        return this.state.languages.map(language => this._renderLanguageItem(language))
    };

    _renderLanguageItem = (language) => {
        return (
          <Item key={language.code}>
              <CheckBox
                  style={{flex: 1, padding: 10}}
                  onClick={this._onLanguageSelect.bind(this, language)}
                  isChecked={language.checked}
                  leftText={language.name}
              />
          </Item>
        );
    };

    _onLanguageSelect = (selectedLanguage) => {
        console.log('selected language', selectedLanguage);
        this._handleCheckedState(selectedLanguage);
        this._changeLanguage(selectedLanguage);
    };

    _handleCheckedState = (selectedLanguage) => {
        const languages = this.state.languages;
        const index = languages.findIndex(language => language.code === selectedLanguage.code);
        console.log('index', index);
        if (index > -1) {
            languages.map(language => language.checked = false);
            languages[index].checked = !languages[index].checked;
            this.setState({ languages });
        }
    };

    _changeLanguage = (selectedLanguage)  => {
        const { changeLanguage } = this.props;
        changeLanguage(selectedLanguage);
    };
}

const mapStateToProps = (state) => ({
    currentLanguage: LanguageSelectors.selectLanguage(state)
});

const mapDispatchToProps = (dispatch) => ({
    changeLanguage: (language) => dispatch(LanguageActions.changeLanguage(language))
});


export default connect(mapStateToProps, mapDispatchToProps)(Language);
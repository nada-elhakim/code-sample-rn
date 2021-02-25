import React, {Component} from 'react';
import {Image, View, Alert} from "react-native";
import ShareUtile from './../../native/ShareUtil';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import UseChainIcon from "../UseChainIcon/UseChainIcon";
import Text from "../../theme/components/Text/Text";
import {withNamespaces} from "react-i18next";
import {ArticleSelectors} from "../../screens/Article/ArticleRedux";
import {connect} from "react-redux";
import Images from "../../theme/variables/Images";
import { AppInstalledChecker } from 'react-native-check-app-install';

class SharePopupMenu extends Component {
    render() {
        const {t} = this.props;
        return (
            <View>
                <Menu>
                    <MenuTrigger>
                        <UseChainIcon name="icon-promotion" size={24}/>
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={this.shareWeibo.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={Images.sinaShareIcon} style={{width: 30, height: 30, marginRight: 6}} />
                                <Text>{t('common:interface.weibo')}</Text>
                            </View>
                        </MenuOption>
                        <MenuOption onSelect={this.shareWechat.bind(this)}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={Images.wechatShareIcon} style={{width: 30, height: 30, marginRight: 6}} />
                                <Text>{t('common:interface.wechat')}</Text>
                            </View>
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            </View>
        );
    }

    shareWeibo() {
        this.shareContent(1);
    }

    shareWechat() {
        const {t} = this.props;
        // check if wechat is installed
        AppInstalledChecker
            .checkURLScheme('weixin')
            .then((isInstalled) => {
                // isInstalled is true if the app is installed or false if not
                if (isInstalled) {
                    this.shareContent(2);
                } else {
                    Alert.alert(
                        t('common:interface.wechatNotInstalled'),
                        null,
                        [
                            {text: t('common:interface.ok'), onPress: () => console.log('Cancel Pressed')}
                        ],
                        {cancelable: false }
                    )
                }
            });
    }

    shareContent(platformCode) {
        const {article} = this.props;
        let message = 'Usechain article';
        if (article.excerpt) {
            // If platform is sina limit text to 100 characters
            message = platformCode === 1 ? article.excerpt.substring(0, 100) : article.excerpt;
        }
        if (article) {
            ShareUtile.share(
                message,
                article.cover_url,
                article.share_url,
                article.title,
                platformCode,
                () =>{});
        }
    }
}

const mapStateToProps = (state) => ({
    article: ArticleSelectors.selectArticle(state)
});

export default withNamespaces()(connect(mapStateToProps)(SharePopupMenu));

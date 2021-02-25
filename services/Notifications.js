import {Platform} from 'react-native';
import XGPush from 'react-native-xinge-push';

class Notifications {
    // 信鸽增加事件
    onXGAddEvent() {
        XGPush.addEventListener('register', this.onRegister);
        XGPush.addEventListener('notification', this.onNotification);
    }

    // 信鸽移除事件
    onXGRemoveEvent() {
        XGPush.removeEventListener('register', this.onRegister);
        XGPush.removeEventListener('notification', this.onNotification);
    }

    // 初始化推送
    initPush = () => {
        if (Platform.OS === 'android') {
            XGPush.init('2100322211', 'A3VIK72SX57U'); //此处需要替换
        } else {
            XGPush.init('2200322210', 'IEL7K41QA44D'); //此处需要替换
        }

        this.initXGRegister();
    }

    // 注册
    initXGRegister = () => {
        XGPush.register('packageName')
            .then((result) => result)
            .catch((err) => {
                console.warn('xinge registration fail', err);
            });
    }

    // 注册成功
    onRegister = (deviceToken) => {
        console.log(`onRegister: ${deviceToken}`);
    }

    // 通知到达
    onNotification = (notification) => {
        if (notification.clicked === true) {
            this.onLinkToSceneKeyPath(notification);
            console.log(`app处于后台时收到通知${JSON.stringify(notification)}`);
        } else {
            console.log(`app处于前台时收到通知${JSON.stringify(notification)}`);
        }
    }

    setTag(uid = 6) {
        console.log('tag', `iosu${uid}`, `androidu${uid}`);
        if (Platform.OS === 'ios') {
            XGPush.setTag(`iosu${uid}`);
        } else {
            XGPush.setTag(`androidu${uid}`);
        }
    }

    deleteTag(uid = 6) {
        console.log('tag', `iosu${uid}`, `androidu${uid}`);
        if (Platform.OS === 'ios') {
            XGPush.deleteTag(`iosu${uid}`);
        } else {
            XGPush.deleteTag(`androidu${uid}`);
        }
    }


    // 信鸽通知跳转
    async onLinkToSceneKeyPath(notification) {}
}

export default Notifications;
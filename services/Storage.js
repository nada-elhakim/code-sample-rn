import { AsyncStorage } from 'react-native';
import config from '../config/AppConfig';

export function saveToken(token) {
    AsyncStorage.setItem('token', token);
}

export async function getToken() {
    try {
        const token = await AsyncStorage.getItem('token');
        return token;
    } catch (error) {
        console.log(error);
    }
}

export function removeTokenFromStorage() {
    return AsyncStorage.removeItem('token');
}

export function saveUser(user) {
    AsyncStorage.setItem('user', JSON.stringify(user));
}

export async function getUser() {
    try {
        const user = await AsyncStorage.getItem('user');
        return JSON.parse(user);
    } catch (error) {
        console.log(error);
    }
}

export function removeUserFromStorage() {
    return AsyncStorage.removeItem('user');
}

export function saveProfile(profile) {
    console.log('save profile', profile);
    try {
        AsyncStorage.setItem('profile', JSON.stringify(profile));
    } catch (error) {
        console.log('error', error);
    }
}

export async function getProfile() {
    try {
        const profile = await AsyncStorage.getItem('profile');
        console.log('saved profile', profile);
        return profile ? JSON.parse(profile): null;

    } catch (error) {
        console.log(error);
    }
}

export function removeProfileFromStorage() {
    return AsyncStorage.removeItem('profile');
}

export function saveLanguage(language) {
    return AsyncStorage.setItem('language', JSON.stringify(language));
}

export async function getLanguage() {
    try {
        const language = await AsyncStorage.getItem('language');
        return language ? JSON.parse(language): null;
    } catch (error) {
        console.log(error);
    }
}




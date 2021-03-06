import {readFile, writeFile} from "./utils/file-reader-writer.js";
import config from "./constants/config.js";
import constants from "./constants/constants.js";

let userInfo = {};

const defaultInfo = {
    language: 'eng'
};

const getUserInfo = (id) => {
    if(!userInfo[id]){
        let userInfoFromFile;
        try {
            userInfoFromFile = readFile(`${config.files.users}/user_${id}.json`);
        } catch (e) {
            return defaultInfo;
        }
        if (userInfoFromFile) {
            userInfo[id] = userInfoFromFile;
        }
    }
    return userInfo[id];
};

const saveUserInfo = (id, info) => {
    const parsedInfo = parseUserInfo(info);
    userInfo = parsedInfo;
    writeFile(`${config.files.users}/user_${id}.json`, parsedInfo);
    return userInfo;
};

const parseUserInfo = (info) => {
    let language;
    const availableLanguages = constants.getLanguageList();
    if (availableLanguages.includes(info.language_code)) {
        language = info.language_code;
    } else {
        language = defaultInfo.language;
    }

    return  {
        id: info.id,
        language: language,
        firstName: info.first_name,
        lastName: info.last_name
    };
};

const updateUserInfo = (id, newUserInfo) => {
    const oldUserInfo = getUserInfo(id);
    const updatedInfo = {
        ...oldUserInfo,
        ...newUserInfo
    };

    userInfo = updatedInfo;
    writeFile(`${config.files.users}/user_${id}.json`, updatedInfo);
    return userInfo;
};

export default {
    getUserInfo,
    saveUserInfo,
    updateUserInfo
}
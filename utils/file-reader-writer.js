import fs from 'fs';

export const writeFile = (fileName, data) => {
    fs.writeFile(fileName, JSON.stringify(data), error => {
        if (error) throw new Error(error.message);
    });
};

export const readFile = (fileName) => {
    try {
        return JSON.parse(fs.readFileSync(fileName, 'utf8'));
    } catch (e) {
        throw new Error(e.message);
    }
};

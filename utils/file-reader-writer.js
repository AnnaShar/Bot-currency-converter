import fs from 'fs';

export const writeFile = (fileName, data) => {
    fs.writeFile(fileName, JSON.stringify(data), error => {
        if (error) throw new Error(error.message);
    });
};

export const readFile = (fileName) => {
    const data =  JSON.parse(fs.readFileSync(fileName, 'utf8'));
    return data;
};

//TODO why does it not work???
export const readFileAsync = async (fileName) => {
    const data = await fs.readFile(fileName, (error, data) => {
        if (error) {
            throw new Error(error.message);
        }
        return data;
    });
    return data;
};
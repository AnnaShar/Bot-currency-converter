const parse = (conversion) => {
    const from = conversion.split('_to_')[0];
    const to = conversion.split('_to_')[1];
    return `${from}/${to}`;
};

export default {
    parse: parse
}
export const stripTags = (htmlString) => {
    return htmlString.replace(/(<([^>]+)>)/gi, "");
};

export const ucfirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const apexChtSeries = (data) => {
    return [
        {
            data: data,
        },
    ];
};

export const isEmpty = (value) => {
    if (
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.length === 0) ||
        (typeof value === "object" && Object.keys(value).length === 0)
    ) {
        return true;
    }
    return false;
};

export const getRandInArray = (array) => {
    const randIndex = Math.floor(Math.random() * array.length);
    return array[randIndex];
};

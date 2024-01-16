export const stripTags = (htmlString) => {
    return htmlString.replace(/(<([^>]+)>)/gi, "");
};

export const ucfirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const targetServer = 'http://localhost:10080';

export const createURLWithParams = (targetUrl, params) => {
    const url = new URL(`${targetServer}/${targetUrl}`);
    url.search = new URLSearchParams(params);
    return url;
};
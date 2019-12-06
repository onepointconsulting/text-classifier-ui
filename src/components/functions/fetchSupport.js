const targetServer = 'http://176.34.128.143:8080';

export const createURLWithParams = (targetUrl, params) => {
    const url = new URL(`${targetServer}/${targetUrl}`);
    url.search = new URLSearchParams(params);
    return url;
};
const API_URL = 'http://localhost:3000';

const commonHeaders = {
    'Content-Type': 'application/json',
}

const fetchJson = (url, { method, headers, body }) => {
    return fetch(url, {
        method,
        headers,
        body: method !== 'GET' ? JSON.stringify(body) : undefined,
    }).then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch ${url}`);
        }
        return response.json();
    })
};

const request = (method, endpoint, data) => {
    return fetchJson(`${API_URL}${endpoint}`, {
        method,
        headers: commonHeaders,
        body: data
    })
};

const get = (endpoint) => {
    return request('GET', endpoint);
}

const post = (endpoint, data) => {
    return request('POST', endpoint, data);
}

const put = (endpoint, data) => {
    return request('PUT', endpoint, data);
}

const del = (endpoint, data) => {
    return request('DELETE', endpoint, data);
}

export { get, post, put, del };
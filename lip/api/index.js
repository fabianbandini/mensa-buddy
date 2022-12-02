function createFetchFunction(method) {
    return async (url, params) => {
        const _params = {
            method,
            headers: {
                "content-type": "application/json",
            },
            ...params,
        }

        if (_params.body !== undefined) {
            _params.body = JSON.stringify(_params.body)
        }

        const response = await fetch(url, _params)

        if (!response.ok) {
            // throw the response status for error handling where called (registers 'username exists' for example)
            // example response.status value: 403
            throw response.status
        }

        try {
            return await response.json()
        } catch {
            // this has to be improved in the future, for now an empty catch
        }
    }
}

export const getJSON = createFetchFunction("GET")
export const BASE_URL = "http://localhost:8080/api/";


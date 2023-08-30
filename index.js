const customError = (status) => {
    let error;
    switch (status) {
        case 500:
            error = "Server error"
            break;
        case 400:
            error = "Bad request"
            break;
        case 403:
            error = "Forbidden"
            break;
        case 404:
            error = "Not found"
            break;
        case 200:
            error = "HURRAY"
            break;
        default:
            error = "Not handled"
            break;
    }
    return error;
};

const customError2 = (status) => {
    if (status == 500) return "Server error"
    else if (status == 400) return "Bad request"
    else if (status == 403) return "Forbidden"
    else if (status == 404) return "Not found"
    else if (status == 200) return "HURRAY"
    else return 'Not handled'
};

const customError3 = (status) => (
    {
        500: "Server error",
        400: "Bad request",
        403: "Forbidden",
        404: "Not found",
        200: "HURRAY",
    }[status] || "Not handled"
);

const customError4 = status => new Map([
    [500, "Server error"],
    [400, "Bad request"],
    [403, "Forbidden"],
    [404, "Not found"],
    [200, "HURRAY"]
]).get(status) || 'Not handled';


const responseStatus = 200; //Change to test
console.log('customError switch:', customError(responseStatus));
console.log('customError if:', customError2(responseStatus));
console.log('customError object:', customError3(responseStatus));
console.log('customError map:', customError4(responseStatus));



//! APPLIED EXAMPLE (map Version)
const path = '/users'; //Change to test

const renderResponse = (res) => {
    const node = document.getElementById('test');
    let content = '';

    const renderUser = (a) => `<div><p>id:${a.id}</p><p>name:${a.name}</p><p>email:${a.email}</p></div>`

    if (typeof res == "string") content = res; //ERROR
    else if (!res.length) content = renderUser(res); //BY ID
    else res.forEach(item => content += renderUser(item)); //ARRAY

    node.innerHTML = content;
}

const customErrors = {
    login: status => new Map([
        [500, "500: Server error"],
        [400, "400: Bad request"],
        [403, "403: The password is wrong"],
        [404, "404: Are you sure you have entered the correct account?"]
    ]).get(status) || 'Not handled response statuscode',

    users: status => new Map([
        [500, "500: Server error"],
        [400, "400: Bad request"],
        [403, "403: Forbidden"],
        [404, "404: Can´t find user"]
    ]).get(status) || 'Not handled response statuscode',
}

fetch(`https://jsonplaceholder.typicode.com${path}`)
    .then(response => {
        if (response.ok) return response.json()
        else renderResponse(customErrors.users(response.status))
    })
    .then(json => renderResponse(json))
    .catch(err => err)
    .finally("signal abort");
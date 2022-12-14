/**
 * Frontend model for docs
 * 
 */


const docsModel = {
    baseUrl: window.location.href.includes("localhost") ? 
        "http://localhost:1337" :
        "https://jsramverk-editor-jolf20.azurewebsites.net",

    getAllDocs: async function getAllDocs(token) {
        /* const response = await fetch(`${docsModel.baseUrl}/docs`, {

            headers: {
                'x-access-token': token,
            }
        }); */

        const response = await fetch(`${docsModel.baseUrl}/graphql`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token,
            },

            body: JSON.stringify({query: 
                `{docs
                    {
                        _id
                        name
                        html
                        allowed_users
                    }
                }`
            })
        });

        const documents = await response.json();

        return documents.data.docs;
    },

    getOneDocById: async function getOneDocById(id, token) {
        const response = await fetch(`${docsModel.baseUrl}/docs/${id}`, {

            headers: {
                'x-access-token': token,
            }
        });

        const document = await response.json();

        return document.data;
    },

    getUsers: async function getUsers(_id, token) {
        const response = await fetch(`${docsModel.baseUrl}/graphql`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token,
            },

            body: JSON.stringify(
                {query: `{doc (_id: "${_id}") { allowed_users }}`
            })
        });

        const document = await response.json();

        return document.data.doc.allowed_users;
    },

    saveDoc: async function saveDoc(doc, token) {
        const response = await fetch(`${docsModel.baseUrl}/docs`, { 
            body: JSON.stringify(doc),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token
            },
            method: 'POST'
        });

        const result = await response.json();

        return result;
    },


    saveDocQL: async function saveDocQL(doc, token) {
        const response = await fetch(`${docsModel.baseUrl}/graphql`, {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'x-access-token': token,
            },


            body: JSON.stringify(
                {
                    query: 
                    `mutation{ 
                        saveDoc(doc: {name: "${doc.name}", html: "${doc.html}", allowed_users: "${doc.allowed_users}", code: ${doc.code}, comments: "${doc.comments}"}) 
                    }`
            })
        });

        const result = await response.json();

        return result.data.saveDoc;
    },

    updateDoc: async function updateDoc(doc, token) {
        const response = await fetch(`${docsModel.baseUrl}/docs`, {
            body: JSON.stringify(doc),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token,
            },
            method: 'PUT'
        });

        const result = await response.json();

        return result;
    },

    sendCode: async function sendCode(code) {

        const data = {
            code: btoa(code)
        }

        const response = await fetch(`https://execjs.emilfolino.se/code`, { 
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
            },
            method: 'POST'
        });

        const result = await response.json();

        const decodedResult = atob(result.data);

        return decodedResult;

    },

    emailNewUser: async function emailNewUser(user, email, token) {
        const data = {
            user: user,
            email: email
        }

        const response = await fetch(`${docsModel.baseUrl}/docs/user`, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json',
                'x-access-token': token,
            },
            method: 'POST'
        });

        const result = await response.json();

        return result;
    }

}

export default docsModel;

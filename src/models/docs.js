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

        //console.log(`Documents = ${documents}`)

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

        //console.log(result);

        return result;
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
    }

}

export default docsModel;

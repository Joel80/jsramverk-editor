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

    getUsers: async function getUsers(_id, token) {
        //console.log(`${_id}`);
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

        //console.log(document);
        //console.log(`Documents = ${documents}`)

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

        //console.log(result);

        return result;
    },


    saveDocQL: async function saveDocQL(doc, token) {
        //console.log(`${doc.name}`);
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
                        saveDoc(doc: {name: "${doc.name}", html: "${doc.html}", allowed_users: "${doc.allowed_users}"}) 
                    }`
            })
        });

        const result = await response.json();

        console.log(result);

        //console.log(document);
        //console.log(`Documents = ${documents}`)

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
        //console.log(result);
        const decodedResult = atob(result.data);

        console.log(decodedResult);

        return decodedResult;

        /*     var data = {
            code: btoa('console.log("hej");')
        };
        
        fetch("https://execjs.emilfolino.se/code", {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(function (response) {
            return response.json();
        })
        .then(function(result) {
            let decodedOutput = atob(result.data);
            console.log(decodedOutput); // outputs: hej
        }); */
    }

}

export default docsModel;

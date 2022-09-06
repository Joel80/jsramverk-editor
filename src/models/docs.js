/**
 * Frontend model for docs
 * 
 */


const docsModel = {
    baseUrl: window.location.href.includes("localhost") ? 
        "http://localhost:1337" :
        "https://jsramverk-editor-jolf20.azurewebsites.net",

    getAllDocs: async function getAllDocs() {
        const response = await fetch(`${docsModel.baseUrl}/docs`);

        const documents = await response.json();

        return documents.data;
    },

    getOneDocById: async function getOneDocById(id) {
        const response = await fetch(`${docsModel.baseUrl}/docs/${id}`);

        const document = await response.json();

        return document.data;
    }
}

module.exports = docsModel;

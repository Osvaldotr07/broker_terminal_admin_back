const MongoLib = require('../lib/mongo')


class FormService {
    constructor(){
        this.collection = 'forms'
        this.mongoDB = new MongoLib()
    }

    async getForms({ email }){
            const query = { userEmail: email}
            const forms = await this.mongoDB.getAll(this.collection, query)
            return forms || []
        
    }

    async getForm( formId ){
        const form = await this.mongoDB.get(this.collection, formId)
        return form || []
    }

    async createForm({ form }){
        const createFormId = await this.mongoDB.create(this.collection, form)
        console.log(createFormId)
        return createFormId
    }

    async patchForm({ formId, form }){
        const patchFormId = await this.mongoDB.update(this.collection, formId, form)
        return patchFormId
    }

    async updateForm({ formId, form } = {}){
        const updateFormId = await this.mongoDB.update(this.collection, formId, form)
        return updateFormId
    }

    async deleteForm({ formId }){
        const deleteFormId = await this.mongoDB.delete(this.collection, formId)
        return deleteFormId
    }
}

module.exports = FormService
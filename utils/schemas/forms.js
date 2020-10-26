const joi = require('@hapi/joi')

const userIdSchema = joi.string().regex(/^[0-9a-fA-F]{24}$/)

const formSchema = {
    terms: joi.boolean(),
    name: joi.string(),
    lastName: joi.string(),
    phoneNumberUser: joi.string(),
    jobTitle: joi.string(),
    userEmail: joi.string().email(),
    ownerEmail: joi.string(),
    phoneOwner: joi.string(),
    ownerName: joi.string(),
    ownerLastName: joi.string(),
    applicationDate: joi.string(),

    //company details
    companyName: joi.string(),
    rfcCompany: joi.string(),
    companyUrl: joi.string(),
    companyPhoneNumber: joi.string(),
    facebookProfile: joi.string(),
    twitterProfile: joi.string(),

    //Direction company
    addressCompany: joi.string(),
    addressNumber: joi.number(),
    countryName: joi.string(),
    cityName: joi.string(),
    stateName: joi.string(),
    zipName: joi.number()
}


const createUserSchema = {
    ...formSchema
}

module.exports = {
    userIdSchema,
    createUserSchema
}
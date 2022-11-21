const tags = []
const category = []
const subCategory = []

const validateTags = (tags) => {
    if (!Array.isArray(tags)) {
        return tags.replace("[", "").replace("]", "").replace("{", "").replace("}", "").split(",").filter((tag) => {
            return tag !== ""
        })
    }
    return tags

}
//  "asgh,gdh,dghd,h" aftersplit ["asgh","gdh","dghd","h"]//

const validateSubCategory = (subCategory) => {
    if (!Array.isArray(subCategory)) {
        return subCategory.replace("[", "").replace("]", "").replace("{", "").replace("}", "").split(",").filter((subCategory) => {
            return subCategory !== ""
        })
    }
    return subCategory
}

const validateCategory = (category) => {
    if (!Array.isArray(category)) {
        return category.replace("[", "").replace("]", "").replace("{", "").replace("}", "").split(",").filter((category) => {
            return category !== ""
        })
    }
    return category
}

//                        (?=.*[0-9]) atleast one digit 
//                        (?=.*[A-Z]) atleast one uppercase letter
//                        (?=.*[a-z]) atleast one lowercase letter
//                        (?=.*[!@#$%^&*]) atleast one special charactor
//                         [a-zA-Z0-9!@#$%^&*]{6-16} length in b/w in 6 to 16 and any char belongs to [a-zA-Z0-9!@#$%^&*]
const validatePassword = (password, res) => {
    let regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
    if (!regex.test(password)) {
        res.status(400).send({ status: false, msg: "Password must contain atleast one uppercase, one lowercase, one special character, and length of password must be in range [6-16]" })
        return false;
    }
    return true;
}

const validateName = (Name, res, whatis) => {
    let regex = /[A-Z]{1}[a-z]{2}[a-z]*/
    if (!regex.test(Name)) {
        res.status(400).send({ status: false, msg: `${whatis} must start with upper case letter and length must be greater than 2` })
        return false;
    }
    return true;

}

const validateObjectId = (id, res, whatIs) => {
    // console.log(id)
    var regex = /^[0-9a-f]{24}$/;
    if (!regex.test(id)) {
        res.status(400).send({ status: false, msg: `${whatIs} is not valid` });
        return false;
    }
    return true;
}
// 633747346746734376473

const validateEmail = (email, res) => {
    var regex = /\S+@\S+\.\S+/;
    if (!regex.test(email)) {
        res.status(400).send({ status: false, msg: "Email should look like this anything@anything.anything" })
        return false;
    }
    return true

}

const validateRequest = (req, res, next) => {

    if (req.query) {
        if (req.query.authorId !== undefined)
            if (!validateObjectId(req.query.authorId, res, "authorId")) return;
        if (req.query.blogId !== undefined)
            if (!validateObjectId(req.query.blogId, res, "blogId")) return;
        if (req.query.tags !== undefined)
            req.query.tags = validateTags(req.query.tags)
        if (req.query.subCategory !== undefined)
            req.query.subCategory = validateSubCategory(req.query.subCategory)
        if (req.query.category !== undefined)
            req.query.category = validateCategory(req.query.category)
    }


    if (req.body) {
        if (req.body.authorId !== undefined)
            if (!validateObjectId(req.body.authorId, res, "authorId")) return;
        if (req.body.tags !== undefined)
            req.body.tags = validateTags(req.body.tags)
        if (req.body.subCategory !== undefined)
            req.body.subCategory = validateSubCategory(req.body.subCategory)
        if (req.body.fname !== undefined)
            if (!validateName(req.body.fname, res, "fname")) return;
        if (req.body.lname !== undefined)
            if (!validateName(req.body.lname, res, "lname")) return;
        if (req.body.email !== undefined)
            if (!validateEmail(req.body.email, res)) return;
        if (req.body.password !== undefined)
            if (!validatePassword(req.body.password, res)) return;

    }
    
    if(req.params.blogId!==undefined)
    if (!validateObjectId(req.params.blogId, res, "blogId")) return;

    next()

}

module.exports.validateRequest = validateRequest


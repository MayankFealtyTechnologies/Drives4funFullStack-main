
const models = {
    Users: require("./users"),
    FeedBack: require("./feedBack"),
}

module.exports = {
    create: async (model, data, cb) => {
        try {
            const instance = models[model](data);
            const result = await instance.save()
            return cb(null, result, `${model} created successfully.`, 201);
        } catch (error) {
            return cb(error, null, "Something went worng.", 500)
        }
    },
    getAll: async (model, filter, cb, sort = {}, populate = "") => {
        try {
            var page = filter?.page || 1;
            var limit = filter?.limit || 10;
            delete filter?.page
            delete filter?.limit
            const result = await models[model].find(filter).skip((page - 1) * limit).limit(limit).sort(sort);
            // const result = await models[model].find(filter).populate(populate).sort(sort);
            return cb(null, result, `${model} find successfully.`, 200);
        } catch (error) {
            return cb(error, null, "Something went worng.", 500)
        }
    },
    getCount: async (model, filter, cb) => {
        try {
            delete filter.page;
            const result = await models[model].count(filter);
            return cb(null, result, `${model} count successfully.`, 200);
        } catch (error) {
            return cb(error, null, "Something went worng.", 500)
        }
    },
    getOne: async (model, filter, cb, populate = "", sort = {}) => {
        try {
            const result = await models[model].findOne(filter).populate(populate).sort(sort);
            if (result) return cb(null, result, `${model} find successfully.`, 200);
            else return cb(`${model} not found.`, null, `${model} not found.`, 404);
        } catch (error) {
            return cb(error, null, "Something went worng.", 500)
        }
    },
    updateOne: async (model, filter, data, cb) => {
        try {
            const result = await models[model].findOneAndUpdate(filter, data)
            return cb(null, result, `${model} update successfully.`, 201);
        } catch (error) {
            return cb(error, null, "Something went worng.", 500)
        }
    },
    updateAll: async (model, filter, data, cb) => {
        try {
            const result = await models[model].updateMany(filter, data)
            return cb(null, `${model} update successfully.`, `${model} update successfully.`, 201);
        } catch (error) {
            return cb(error, null, "Something went worng.", 500)
        }
    },
    deleteOne: async (model, filter, cb) => {
        try {
            const result = await models[model].findOneAndDelete(filter)
            return cb(null, result, `${model} delete successfully.`, 201);
        } catch (error) {
            return cb(error, null, "Something went worng.", 500)
        }
    }
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doa = require("../models/doa");

module.exports = {
    signUp: async function (data, cb) {
        doa.getOne("Users", { email: data?.email }, async (error, result, message, code) => {
            if (result) return cb("The email number is already taken.", null, "The email number is already taken.", 400);
            else {
                if (data?.password) data.password = await bcrypt.hash(data.password, 12);
                data.role = "admin";
                doa.create("Users", data, (error, newUser, message, code) => {
                    if (newUser) return cb(error, newUser, message, code);
                    else return cb("Something went wrong.", null, "Something went wrong.", 400);
                })
            }
        })
    },

    login: async function (data, cb) {
        doa.getOne("Users", { email: data?.email }, async (error, result, message, code) => {
            if (result) {
                const success = await bcrypt.compare(data?.password, result?.password);
                if (success) {
                    const token = jwt.sign({ _id: result?._id, email: result?.email, role: result?.role }, process.env.JWT_KEY);
                    return cb(null, { token, user: result }, "User login successfully", 200);
                } else return cb("Incorrect Password.", null, "Please write correct password.", 200);
            }
            else return cb("The email number is not registered.", null, "The email number is not registered.", 200);
        });
    },

    create: async function (data, cb) {
        doa.create("Users", data, (error, result, message, code) => {
            return cb(error, result, message, code);
        });
    },
    get: async function (data, cb) {
        var filter = { role: { $ne: "admin" }, page: data?.page || 0 }
        if (data?.status && data?.status !== "all") filter.status = data?.status;
        var count = await doa.getCount("Users", JSON.parse(JSON.stringify(filter)), (error, result, message, code) => result)
        doa.getAll("Users", filter, (error, result, message, code) => {
            return cb(error, { count, list: result }, message, code);
        }, { createdAt: -1 });
    },

    getFeedback: async function (data, cb) {
        var count = await doa.getCount("FeedBack", {}, (error, result, message, code) => result)
        doa.getAll("FeedBack", {}, (error, result, message, code) => {
            return cb(error, { count, list: result }, message, code);
        }, { createdAt: -1 });
    },

    update: async function (data, cb) {
        doa.updateOne("Users", { _id: data?._id }, data, (error, result, message, code) => {
            return cb(error, result, message, code);
        });
    },

    delete: async function (data, cb) {
        doa.deleteOne("Users", { _id: data?._id }, (error, result, message, code) => {
            return cb(error, result, message, code);
        });
    },

    feedbackCreate: async function (data, cb) {
        doa.create("FeedBack", data, (error, result, message, code) => {
            return cb(error, result, message, code);
        });
    },

}
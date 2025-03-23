const Vacancy = require("../../models/careerModel");
const UserModel = require('../../models/userModel');
const OrderModel = require('../../models/orderModel');
const MenuModel = require('../../models/menuModel');

module.exports.getStatistics = async function (req, res) {
    try {
        const [
            totalUsers,
            totalStaff,
            pendingOrders,
            acceptedOrders,
            completedOrders,
            postedVacancies,
            allProducts
        ] = await Promise.all([
            UserModel.countDocuments({ userRole: 'user' }),
            UserModel.countDocuments({ userRole: 'staff' }),
            OrderModel.countDocuments({ status: 'Pending' }),
            OrderModel.countDocuments({ status: 'Accepted' }),
            OrderModel.countDocuments({ status: 'Completed' }),
            Vacancy.countDocuments() ,
            MenuModel.countDocuments({availability: true})
        ]);

        res.status(200).json({
            totalUsers,
            totalStaff,
            pendingOrders,
            acceptedOrders,
            completedOrders,
            postedVacancies,
            allProducts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



module.exports.getStaffStatistics = async function (req, res) {
    try {
        const [
            pendingOrders,
            acceptedOrders,
            completedOrders,
            allProducts
        ] = await Promise.all([
            OrderModel.countDocuments({ status: 'Pending' }),
            OrderModel.countDocuments({ status: 'Accepted' }),
            OrderModel.countDocuments({ status: 'Completed' }),
            MenuModel.countDocuments({availability: true})
        ]);

        res.status(200).json({
            pendingOrders,
            acceptedOrders,
            completedOrders,
            allProducts
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

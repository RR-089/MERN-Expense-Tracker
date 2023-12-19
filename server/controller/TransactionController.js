import Transaction from "../models/Transaction.js";

export const index = async (req, res) => {
    
    // const demo = await Transaction.aggregate([
    //     {
    //         $match: { user_id: req.user._id },
    //     },
    //     {
    //         $group: {
    //             _id: { $month: "$date" },
    //             transactions: {
    //                 $push: {
    //                     amount: "$amount",
    //                     description: "$description",
    //                     date: "$date",
    //                     _id: "$_id",
    //                     category_id: "$category_id"
    //                 },
    //             },
    //             totalExpenses: { $sum: "$amount" },
    //         },
    //     },
    //     { $sort: { _id: - 1 } },
    // ]);

    const demo = await Transaction.aggregate([
        {
            $match: { user_id: req.user._id },
        },
        {
            $group: {
                _id: { $month: "$date" },
                transactions: {
                    $push: {
                        amount: "$amount",
                        description: "$description",
                        date: "$date",
                        _id: "$_id",
                        category_id: "$category_id"
                    },
                },
                totalExpenses: { $sum: "$amount" },
            },
        },
        { $sort: { _id: -1 } }, // Sort by month in descending order
        {
            $project: {
                _id: 1,
                transactions: {
                    $reverseArray: "$transactions" // Reverse the order of transactions
                },
                totalExpenses: 1
            }
        }
    ]);
    
    res.json({ data: demo });
}

export const create = async (req, res) => {
    const { amount, description, date, category_id } = req.body;
    const transaction = new Transaction({
        amount,
        description,
        date,
        user_id: req.user._id,
        category_id
    });
    await transaction.save();
    res.json({ message: "Success" });
}

export const remove = async (req, res) => {
    await Transaction.findOneAndDelete({ _id: req.params.id });
    res.json({ message: "Success" });
}

export const update = async (req, res) => {
    await Transaction.findOneAndUpdate({ _id: req.params.id }, { $set: req.body });
    res.json({ message: "Success" });
}
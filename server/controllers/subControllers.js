import Sub from "../models/Sub.js";


const createSub = async (req, res) =>{
    try{
        const { name, startdate, amount, billcycle } = req.body;
        if(!name || !startdate || !amount || !billcycle){
            return res.status(400).json({
                success: false,
                message: "Enter all required fields"
            })
        }
        let nextbilldate = new Date(startdate);
        if(billcycle  === "Weekly"){
            nextbilldate.setDate(nextbilldate.getDate()+7);
        }
        else if(billcycle === "Monthly"){
            nextbilldate.setMonth(nextbilldate.setMonth()+1);
        }
        else if(billcycle === "Yearly"){
            nextbilldate.setFullYear(nextbilldate.getFullYear()+1);
        }
        const newSub = await Sub.create({
            userId: req.user.id, name, startdate, nextbilldate, amount, billcycle, active: true
        });
        return res.status(201).json({
            success: true,
            message: "Subscription added successfully",
            sub: newSub
        })

    }
    catch(error){
        console.error("Error adding subscription: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
    
}


const getSubs = async (req, res) => {
    try{
        const userId = req.user.id;
        const subs = await Sub.find({ userId });
        return res.status(200).json({
            success: true,
            Subscriptions: subs
        })
    }
    catch(error){
        console.error("Error fetching subscriptions: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })

    }
}


const updateSub = async (req, res) => {
    try{
        const subId = req.params.id;
        const sub = await Sub.findById(subId);
        if(!sub){
            return res.status(404).json({
                success: false,
                message: "Subscription not found"
            })
        }
        if(sub.userId.toString() !== req.user.id){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }

        const updatedSub = await Sub.findByIdAndUpdate(subId, req.body, { new: true });
        return res.status(200).json({
            success: true,
            message: "Subscription updated successfully",
            sub: updatedSub
        })
    }
    catch(error){
        console.error("Error updating subscription: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}

const deleteSub = async (req, res) => {
    try{
        const subId = req.params.id;
        const sub = await Sub.findById(subId);
        if(!sub){
            return res.status(400).json({
                success: false,
                message: "Subscription not found"
            })
        }
        if(sub.userId.toString() !== req.user.id){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            })
        }
        await Sub.findByIdAndDelete(subId);
        return res.status(200).json({
            success: true,
            message: "Subscription deleted"
        })        
    }
    catch(error){
        console.error("Error deleting subscription: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


const getSummary = async (req, res) => {
    try{
        const subs = await Sub.find({ userId: req.user.id });
        let activecount = 0;
        let totalweekly = 0;
        let totalmonthly = 0;
        let totalyearly = 0;
        subs.forEach(sub => {
            if(sub.active){
                activecount++;
            }
            if(sub.billcycle === "Weekly"){
                totalweekly += sub.amount;
            }
            else if(sub.billcycle === "Monthly"){
                totalmonthly += sub.amount;
            }
            else if(sub.billcycle === "Yearly"){
                totalyearly += sub.amount;
            }
        })
        return res.status(200).json({
            success: true,
            ActiveSubscriptions: activecount,
            TotalWeekly: totalweekly,
            TotalMonthly: totalmonthly,
            TotalYearly: totalyearly
        })
    }
    catch(error){
        console.error("Error fetching summary: ", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        })
    }
}


export { createSub, getSubs, updateSub, deleteSub, getSummary };
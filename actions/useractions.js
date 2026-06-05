"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDb from "@/db/connectDb"
import User from "@/models/User"

export const initiate = async (amount, to_username, paymentform) => {
    await connectDb()

    const user = await User.findOne({ username: to_username })

    if (!user) {
        throw new Error("User not found")
    }

    const instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
    })

    const options = {
        amount: Number.parseInt(amount),
        currency: "INR",
        notes: {
            name: paymentform.name,
            message: paymentform.message,
            to_user: to_username,
        }
    }

    const order = await instance.orders.create(options)

    await Payment.create({
        oid: order.id,
        amount: amount / 100,
        to_user: to_username,
        name: paymentform.name,
        message: paymentform.message,
        done: false,
    })

    return order
}

export const fetchuser = async (username) => {
    await connectDb()

    const user = await User.findOne({ username })

    if (!user) {
        return null
    }

    return user.toObject({
        flattenObjectIds: true,
    })
}

export const fetchpayments = async (username) => {
    await connectDb()

    const payments = await Payment.find({
        to_user: username,
        done: true,
    })
        .sort({ amount: -1 })
        .limit(10)
        .lean()

    return payments
}

export const updateProfile = async (data, oldusername) => {
    await connectDb()

    const ndata = Object.fromEntries(data)

    if (oldusername !== ndata.username) {
        const existingUser = await User.findOne({
            username: ndata.username,
        })

        if (existingUser) {
            return {
                error: "Username already exists",
            }
        }

        await User.updateOne(
            { email: ndata.email },
            ndata
        )

        await Payment.updateMany(
            { to_user: oldusername },
            { to_user: ndata.username }
        )
    } else {
        await User.updateOne(
            { email: ndata.email },
            ndata
        )
    }

    return {
        success: true,
    }
}
export const getDashboardStats = async (username) => {
    await connectDb()

    const user = await User.findOne({ username })

    const payments = await Payment.find({
        to_user: username,
        done: true
    }).lean()

    const totalRaised = payments.reduce(
        (sum, payment) => sum + payment.amount,
        0
    )

    const supporters = payments.length

    const averageDonation =
        supporters > 0
            ? Math.round(totalRaised / supporters)
            : 0

    const goalProgress = user?.goal
        ? Math.min(
              100,
              Math.round((totalRaised / user.goal) * 100)
          )
        : 0

    return {
        totalRaised,
        supporters,
        averageDonation,
        goalProgress,
        recentPayments: payments.slice(0, 5),
    }
}
export const getFeaturedCreator = async () => {
    await connectDb()

    const user = await User.findOne({
        username: "aniketsharma" // apna actual username
    }).lean()

    if (!user) return null

    const payments = await Payment.find({
        to_user: user.username,
        done: true
    }).lean()

    const totalRaised = payments.reduce(
        (sum, payment) => sum + payment.amount,
        0
    )

    const progress = user.goal
        ? Math.min(
            100,
            Math.round((totalRaised / user.goal) * 100)
        )
        : 0

    return {
        name: user.name,
        username: user.username,
        bio: user.bio,
        goal: user.goal,
        totalRaised,
        progress,
        profilepic: user.profilepic,
    }
}
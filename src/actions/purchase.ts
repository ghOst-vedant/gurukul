"use server"
import { db } from "@/lib/prisma"
import { auth } from "../../auth"
import Razorpay from "razorpay"

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Create a new order using Razorpay's API
export const purchaseCourse = async (courseId: string, amount: number) => {
    try {
        const session = await auth()
        if (!session?.user?.id)
            return { success: false, message: "Unauthorized" }
        const userId = session?.user?.id
        const order = await razorpayInstance.orders.create({
            amount: amount * 100, // 100 INR * 100 paise
            currency: "INR",
            receipt: `${userId}_${Date.now()}`, // Custom receipt ID
            payment_capture: true, // Auto-capture payment
        })
        await db.transaction.create({
            data: {
                userId,
                courseId,
                amount,
                orderId: order.id,
                status: "pending",
            },
        })
        return { success: true, order }
    } catch (error) {
        console.error("Failed to create order:", error)
        return { success: false, message: "Failed to create order" }
    }
}

// Verify the payment using Razorpay's API
export const verifyPayment = async (orderId: string, paymentId: string) => {
    try {
        if (!orderId || !paymentId) {
            return { success: false, message: "Invalid request" }
        }
        const response = await razorpayInstance.payments.fetch(paymentId)
        console.log("Verify Response: ", response)

        if (response.order_id !== orderId) {
            return { success: false, message: "Invalid payment" }
        }
        if (response.status === "captured") {
            await db.transaction.update({
                where: { orderId },
                data: { status: "success" },
            })
            return { success: true, message: "Payment successful" }
        }
        return { success: false, message: "Payment failed" }
    } catch (error) {
        console.error("Payment verification failed:", error)
        return { success: false, message: "Payment verification failed" }
    }
}

// Check if the user has purchased the course
export const checkPurchased = async (courseId: string) => {
    try {
        const session = await auth()

        if (!session?.user?.id) return false
        const userId = session?.user?.id

        const purchase = await db.transaction.findFirst({
            where: {
                userId,
                courseId,
                status: "success",
            },
        })

        return !!purchase
    } catch (error) {
        console.error("Error checking purchase:", error)
        return false
    }
}

import axios from "axios"

// This will call your backend to verify the payment with Razorpay's API
export const verifyPayment = async (orderId: string, paymentId: string) => {
    try {
        const response = await axios.post("/api/verify-payment", {
            order_id: orderId,
            payment_id: paymentId,
        })
        return response.data // Response from your backend
    } catch (error) {
        console.error("Payment verification failed", error)
        return { success: false }
    }
}

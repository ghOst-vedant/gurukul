import Razorpay from "razorpay"

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
})

// Function to create Razorpay order

// Function to open Razorpay modal
export const openRazorpayPayment = (
    order: any,
    courseTitle: string,
    onPaymentSuccess: Function
) => {
    const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: order.amount, // Amount in paise
        currency: "INR",
        name: courseTitle,
        description: "Course Purchase",
        order_id: order.id,
        handler: function (response: any) {
            alert("Payment successful")
            onPaymentSuccess() // Update purchase status
            // Here, you can also call the backend to update the transaction in DB
        },
        prefill: {
            name: "User Name", // Fill with user info
            email: "user@example.com",
            contact: "1234567890",
        },
        notes: {
            address: "User's address",
        },
        theme: {
            color: "#F37254",
        },
    }

    const rzp1 = new window.Razorpay(options)
    rzp1.open()
}

// import { NextRequest, NextResponse } from "next/server"
// import Razorpay from "razorpay"

// const razorpayInstance = new Razorpay({
//     key_id: process.env.razorpay_key_id!,
//     key_secret: process.env.razorpay_key_secret!,
// })
// export async function POST(req: NextRequest) {
//     try {
//         const { amount, userId, courseId } = await req.json()

//         if (!amount || !userId) {
//             return NextResponse.json(
//                 { error: "Missing required fields" },
//                 { status: 400 }
//             )
//         }

//         const order = await razorpayInstance.orders.create({
//             amount: amount * 100, // Convert to paise
//             currency: "INR",
//             receipt: `receipt_${userId}_${courseId}_${Date.now()}`, // Custom receipt ID
//             payment_capture: true, // Auto-capture payment
//         })

//         return NextResponse.json(order, { status: 200 })
//     } catch (error) {
//         console.error("Error creating Razorpay order:", error)
//         return NextResponse.json(
//             { error: "Failed to create order" },
//             { status: 500 }
//         )
//     }
// }

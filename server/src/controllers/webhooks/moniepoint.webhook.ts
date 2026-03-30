// import { Request, Response } from 'express';
// import crypto from 'crypto';
// import Payment from '../../models/payment.models';
// import Booking from '../../models/project.models';
// // import Booking from "../../models/booking.models";

// export const moniepointWebhook = async (req: Request, res: Response) => {
//   try {
//     const signature = req.headers['x-moniepoint-signature'] as string;
//     const payload = req.body;

//     const webhookSecret = process.env['MONIEPOINT_WEBHOOK_SECRET'] as string;

//     // 🔐 Verify webhook signature
//     const computedSignature = crypto
//       .createHmac('sha256', webhookSecret)
//       .update(payload)
//       .digest('hex');

//     if (computedSignature !== signature) {
//       console.error('Invalid Moniepoint signature');
//       return res.status(401).send('Invalid signature');
//     }

//     const event = JSON.parse(payload.toString());

//     console.log('Moniepoint webhook:', event);

//     // ✅ Only confirm on SUCCESS
//     if (event.type !== 'payment.success') {
//       return res.status(200).send('Event ignored');
//     }

//     const { reference, amount, status, customer, metadata } = event.data;

//     /**
//      * IMPORTANT:
//      * When creating payment, you should send:
//      * metadata: { bookingId, userId }
//      */
//     const bookingId = metadata?.bookingId;
//     const userId = metadata?.userId;

//     if (!bookingId) {
//       console.error('Missing bookingId in metadata');
//       return res.status(400).send('Missing bookingId');
//     }

//     // 🔁 Prevent duplicate payments (idempotency)
//     const existingPayment = await Payment.findOne({ reference });
//     if (existingPayment) {
//       return res.status(200).send('Payment already processed');
//     }

//     // 💾 Create payment record
//     await Payment.create({
//       email: customer?.email,
//       booking: bookingId,
//       user: userId,
//       reference,
//       amount,
//       status,
//       paidAt: new Date(),
//     });

//     // 📌 Update booking
//     const booking = await Booking.findByIdAndUpdate(
//       bookingId,
//       {
//         paymentStatus: 'PAID',
//         paymentReference: reference,
//       },
//       { new: true }
//     );

//     if (!booking) {
//       console.error('Booking not found:', bookingId);
//       return res.status(404).send('Booking not found');
//     }

//     // 🔔 Optional notifications / emails
//     // await bookingNotification(...)
//     // await sendBookingPaymentEmail(payment.email, amount, booking.sessionType)

//     console.log('Booking payment confirmed:', bookingId);

//     return res.status(200).send('OK');
//   } catch (error) {
//     console.error('Webhook error:', error);
//     return res.status(500).send('Server error');
//   }
// };

import { adminDB } from "@/firebase-admin";
import stripe from "@/lib/stripe";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
    const body = await req.text()
    const headersList = await headers()
    const signature = headersList.get('stripe-signature')
    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_KEY
    if (!webhookSecret) {
        console.error('Stripe webhook secret is not set')
        return NextResponse.json({ error: 'Stripe webhook secret is not set' }, { status: 500 })
    }
    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
        console.error(`Webhook signature vefirication failed: ${err}`)
        return NextResponse.json({ error: `Webhook Error: ${err}` }, { status: 400 })
    }
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session
        const invoice = session.invoice ? await stripe.invoices.retrieve(session.invoice as string) : null
        const invoice_data = {
            id: invoice?.id,
            invoice_pdf: invoice?.invoice_pdf,
            invoice_url: invoice?.invoice_pdf,
        }
        try {
            const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(session?.id, {
                expand: ['data.price.product']
            })
            const sessionProduct = lineItemsWithProduct?.data?.map((item) => ({
                id: item?.id,
                name: item?.description,
                product_details: item?.price?.product,
                quantity: item.quantity,
                price: (item?.price?.unit_amount as number || 0) / 100,
            }))
            const totalAmount = lineItemsWithProduct?.data?.reduce((total, item) => 
                 total + (item?.amount_total as number || 0) /100
            , 0)
            const orderItem = {
                amount: totalAmount,
                items: sessionProduct||[],
                invoice: invoice_data,
            }
            if(sessionProduct?.length){
                const userOrderRef = adminDB.collection('users').doc(session?.customer_email as string)
                                    .collection('orders').doc(session?.id)
                const userDoc = await userOrderRef.get()
                if(!userDoc.exists){
                    await userOrderRef.set({
                        email:session?.customer_email})
                }
                await userOrderRef.set({value:orderItem}, {merge:true})
            }
        } catch (err) {
            console.error(`Error creating invoice: ${err}`)
            return NextResponse.json({error: `Error creating invoice: ${err}`}, {status: 400})
        }

    }
    return NextResponse.json({received: true}, {status: 200})
}
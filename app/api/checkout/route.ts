import { Product } from "@/type";
import { NextRequest, NextResponse } from "next/server";
import Stripe from 'stripe'


export const POST = async (req:NextRequest)=>{
    const STRIPE_KEY = process.env.STRIPE_SECRET_KEY as string
    if(!STRIPE_KEY) throw new Error("Stripe is not initiated")
    const stripe = new Stripe(STRIPE_KEY)
    const domain = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
    const successUrl = `${domain}/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${domain}/cart`
    try {
        const reqBody  =  await req.json()
        const {items,email} = await reqBody
        const extractedItems = await items?.map((item:Product)=>({
            quantity: item?.quantity,
            price_data:{
                currency:'usd',
                unit_amount: Math.round(item.price*100),
                product_data:{
                    name: item?.title,
                    description: item?.description,
                    images: item?.images
                }
            },
            
        }))
        console.log(items)

        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items: extractedItems,
            mode:'payment', 
            invoice_creation:{
                enabled:true
            },
            success_url:successUrl,
            cancel_url:cancelUrl,
            metadata:{
                email,
            },
            customer_email: email
        })
        
        return NextResponse.json({
            url:session?.url
        })
    } catch (err) {
        return NextResponse.json({error:err},{status:500})
    }
}
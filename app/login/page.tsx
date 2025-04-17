import { auth, signIn } from '@/auth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { redirect } from 'next/navigation'
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { SlSocialFacebook, SlSocialGithub } from 'react-icons/sl'

const LoginPage = async () => {

    const session = await auth()
    if(session?.user) {
        return redirect('/')
    }

    return (
        <div className='flex items-center justify-center py-5 md:py-10 gap-5'>
            <div className="flex items-center justify-center bg-gray-200 rounded-lg shadow-md">
                <Card className='flex flex-col items-center justify-center p-5 w-full max-w-md'>
                    <CardHeader className='space-y-1'>
                        <CardTitle>Login</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col justify-around items-center pb-0 min-w-[420px] max-w-md">
                        <CardContent className='space-y-4 '>
                            <div className='flex items-left justify-center gap-2 space-y-2'>
                                <form className='flex  justify-center gap-3 min-w-96 max-w-md'
                                    action={async () => {
                                        "use server"
                                        await signIn("google")
                                    }}
                                >

                                    <Button type="submit" variant={"outline"} className='flex  justify-center gap-2 rounded-2xl w-full'>
                                        <FcGoogle size={20} />
                                        Signin with Google
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                        <CardContent className='space-y-4'>
                            <div className='flex items-center justify-center gap-2 space-y-2 '>
                                <form className='flex items-center justify-center gap-3 min-w-96 max-w-md'
                                    action={async () => {
                                        "use server"
                                        await signIn("facebook")
                                    }}
                                >

                                    <Button type="submit" variant={"outline"} className='flex items-center justify-center gap-2 rounded-2xl w-full'>
                                        <SlSocialFacebook size={20} />
                                        Signin with Facebook
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                        <CardContent className='space-y-4 '>
                            <div className='flex items-center justify-center gap-2 space-y-2'>
                                <form className='flex items-center justify-center gap-3 min-w-96 max-w-sm '
                                    action={async () => {
                                        "use server"
                                        await signIn("github")
                                    }}
                                >

                                    <Button type="submit" variant={"outline"} className='flex items-center justify-center gap-2 rounded-2xl w-full'>
                                        <SlSocialGithub size={20} />
                                        Signin with Github
                                    </Button>
                                </form>
                            </div>
                        </CardContent>
                    </CardContent>
                    <span className='border-b boder-gray-300 text-sm text-gray-400'>Or Continue with</span>
                    <CardContent className="min-w-[420px] max-w-md  p-0">
                    <div className="flex items-center justify-start w-full m-4  gap-3">
                        <div className="flex flex-col gap-8">
                            <Label className="text-sm text-black-300" htmlFor="email">Email</Label>
                            <Label className="text-sm text-black-300" htmlFor="password">Password</Label>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <Input  id="email" type="email" placeholder="abc@example.com" className="outline-none focus:outline-blue-500 focus:ring-2 focus:ring-blue-300 w-full max-w-xs" />
                            <Input id="password" type="password" placeholder="At least 6 characters" className="w-full max-w-xs outline-none" />

                        </div>
                    </div>
                    </CardContent>
                    <CardFooter className='flex justify-center w-full'>
                        <Button variant={"outline"} className='w-full max-w-xs rounded-2xl bg-yellow-400 hover:bg-yellow-500' type="submit">Sign In</Button>
                    </CardFooter>
                    
            
                </Card>
            </div>
        </div>
    )
}

export default LoginPage
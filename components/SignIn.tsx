'use client'
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import { Card, Input, CardBody, CardHeader, Checkbox, CardFooter, Button,Typography } from '@material-tailwind/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { toast } from 'react-toastify';
import { GithubSignInButton, GoogleSignInButton } from './authButtons';
// import Signup from "./Signup";

type Props = {
    data:any
}
export function LoginCard() {
  const router = useRouter();
  const { data: session, status } = useSession();
 



useEffect(()=>{
  if(session){
    router.push('/')
    
  }
},[session])


const onSubmit = async (values: any, actions: any) => {
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        // Handle successful sign-in
      }
    } catch (error) {
      console.error(error); // Log the error to the console
      toast.error("An error occurred during sign-in");
    } finally {
      
      actions.resetForm(); // Reset the form regardless of success or failure
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleBlur, handleSubmit } = useFormik({
      initialValues: {
          email: '',
          password: '',
          rememberMe: false,
      },
   
      onSubmit,
  });

 

  const handleCheckboxChange = (e:any) => {
      handleChange(e); // Pass the event object to handleChange
      // Formik will automatically update the value of `rememberMe` field based on the checked state of the checkbox
  };
  
  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
    <Card className="w-full md:w-96 mt-2"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <CardHeader
                  variant="gradient"
                  color="gray"
                  className="mb-4 grid gap-3 place-items-center"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}      >
        <GoogleSignInButton/>
        <GithubSignInButton/>
        <Typography variant="h3" color="white" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Sign In
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
                        <Input
                      label="Email"
                      size="lg"
                      type='email'
                      name='email'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                      className={errors.email && touched.email ? 'border-red-500' : ''} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                        />
                        {errors.email && touched.email && <p className='text-red-500'>{errors.email}</p>}
                        <Input
                      label="Password"
                      size="lg"
                      type="password"
                      name='password'
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.password && touched.password ? 'border-red-500' : ''} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                        />
                        {errors.password && touched.password && <p className='text-red-500'>{errors.password}</p>}
                        
                        <div className="-ml-2.5">
                            <Checkbox
                          label="Remember Me"
                          name='rememberMe'
                          checked={values.rememberMe}
                          onChange={handleCheckboxChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} crossOrigin={undefined}                            />
                        </div>
                    </CardBody>
      <CardFooter className="pt-0"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
      <Button loading={isSubmitting} variant="gradient" fullWidth type='submit'  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Sign In
      </Button>
        <Typography variant="small" className="mt-6 flex justify-center"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
          Don&apos;t have an account?
          {/* <Signup /> */}
        </Typography>
      </CardFooter>
    </Card>
    </form>
  );
}
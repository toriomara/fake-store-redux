"use client";
import React, { useState } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { login } from "@/features/auth/authSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Loader from "@/components/Loader";

// Zod schema for form validation
const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Reusable Input Field Component
const InputField = ({ name, type, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mb-3">
      <Input {...register(name)} type={type} placeholder={placeholder} />
      {errors[name] && (
        <p className="text-red-500 text-sm">{errors[name]?.message}</p>
      )}
    </div>
  );
};

const LoginPage = () => {
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (data) => {
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Login failed");
      }

      if (res.ok) {
        const data = await res.json();
        dispatch(login({ token: data.token, username: data.username }));
        router.push("/");
      } else {
        setError(result.message || "Login failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container-page h-[90%] flex-1 flex items-center justify-center">
      <Card className="w-full max-w-md p-6 shadow-md flex place-self-center">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleLogin)} className="">
              <InputField
                name="username"
                type="text"
                placeholder="Enter Username"
              />
              <InputField
                name="password"
                type="password"
                placeholder="Enter Password"
              />
              <Button type="submit" className="w-full mt-4">
                Login
              </Button>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;

// "use client"; // Required if using Next.js App Router

// import React from "react";
// import { useForm, FormProvider, useFormContext } from "react-hook-form";

// // Child component using useFormContext
// const InputField = ({ name, type, placeholder }) => {
//   const { register, formState: { errors } } = useFormContext(); // Get form methods

//   return (
//     <div>
//       <input {...register(name, { required: `${name} is required` })} type={type} placeholder={placeholder} />
//       {errors[name] && <p style={{ color: "red" }}>{errors[name]?.message}</p>}
//     </div>
//   );
// };

// const LoginPage = () => {
//   const methods = useForm(); // Initialize the form

//   const onSubmit = (data) => {
//     console.log("Login Data:", data);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", width: "300px", margin: "auto" }}>
//         <h2>Login</h2>
//         <InputField name="username" type="text" placeholder="Enter Username" />
//         <InputField name="password" type="password" placeholder="Enter Password" />
//         <button type="submit">Login</button>
//       </form>
//     </FormProvider>
//   );
// };

// export default LoginPage;

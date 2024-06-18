import FormOauthButton from "@/components/layout/form/formauth/FormOauthButton";
import FormSignin from "@/components/layout/form/formauth/FormSignin";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Signin to kyoukatalk",
  description: "chat with your buddy,and community",
};

const Page = () => {
  return (
    <div className="flex h-full w-full flex-col lg:flex-row">
      <div className="w-full dark:bg-accent lg:max-w-[66.666667%] lg:basis-2/3 lg:bg-slate-50">
        <div className="p-4">
          <Link href="/" className="inline-flex w-fit">
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          </Link>
        </div>
        <div className="hidden h-[calc(100dvh-80px)] items-center justify-center lg:flex">
          <Image
            src="/login-bg.svg"
            alt="image login"
            width={500}
            height={500}
            priority
          />
        </div>
      </div>
      <div className="mx-auto flex min-h-[calc(100dvh-80px)] w-full max-w-[350px] flex-col justify-center space-y-6 p-4 sm:w-[350px] lg:p-0">
        <div className="flex flex-col space-y-0 text-center">
          <h3 className="text-2xl font-semibold">Welcome to karcisku</h3>
          <p>Reserve, Create, Celebrate: Your Event, Your Rules!</p>
        </div>
        <FormOauthButton />
        <div className="relative my-5">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <FormSignin />
        <div className="inline-flex gap-2">
          <p>New to karcisku ?</p>
          <Link href="/register" className="text-primary">
            Create an account
          </Link>
        </div>
        <p className="inlin px-8 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a
            className="underline underline-offset-4 hover:text-primary"
            href="/terms"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            className="underline underline-offset-4 hover:text-primary"
            href="/privacy"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Page;

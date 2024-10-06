"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import axios from "axios";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import Input from "../input/Input";
import Button from "../Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const LoginModal = () => {
    const router = useRouter();
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState : { errors }
    } = useForm<FieldValues>({
        defaultValues : {
            email : "",
            password : ""
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect:false
        })
        .then((callback) => {
            setIsLoading(false);
            if(callback?.ok) {
                toast.success("Logged in")
                router.refresh();
                loginModal.onClose();
            }
            if (callback?.error) {
                toast.error(callback.error);
            }
        })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [registerModal, loginModal])

    const signInWithGoogle = async () => {
        try {
          const result = await signIn("google", { redirect: false });
          if (result?.ok) {
            router.refresh();
            loginModal.onClose();
          } else if (result?.error) {
            toast.error("An error occurred during Google sign-in.");
          }
        } catch (error) {
          toast.error("An error occurred during Google sign-in.");
          console.error(error);
        }
      };
    
      const signInWithGithub = async () => {
        try {
          const result = await signIn("github", { redirect: false });
          if (result?.ok) {
            router.refresh();
            loginModal.onClose();
          } else if (result?.error) {
            toast.error("An error occurred during GitHub sign-in.");
          }
        } catch (error) {
          toast.error("An error occurred during GitHub sign-in.");
          console.error(error);
        }
      };

    const bodyContent = (
        <div className="w-full flex flex-col gap-4 mb-2">
            <Heading 
            title="Welcome back"
            subtitle="Login to your account"
            />
            <Input
            id="email"
            label="Email"
            type="text"
            register={register}
            errors={errors}
            />
            <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            />
        </div>
    );

    const footerContent = (
        <div className="w-full flex flex-col gap-4">
             {/* Horizontal line */}
             <div className="w-full flex flex-row items-center gap-4">
              <div className="flex-1 h-[1px] bg-neutral-200"></div>
              <div className="text-sm font-normal text-gray-500">or</div>
              <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>
            <Button 
            outline
            label="Continue with Google"
            onClick={signInWithGoogle}
            icon={FcGoogle}
            />
            <Button 
            outline
            label="Continue with Github"
            onClick={signInWithGithub}
            icon={AiFillGithub}
            />
            <div className="text-neutral-500 text-center text-sm mb-2 mt-2 font-light">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>Don't have an account?</div>
                    <div
                    onClick={toggle}
                    className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    )


    return ( 
        <Modal 
        isOpen={loginModal.isOpen}
        onClose={loginModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        title="Login"
        body={bodyContent}
        footer={footerContent}
        actionLabel="Continue"
        />
    );
}
 
export default LoginModal;
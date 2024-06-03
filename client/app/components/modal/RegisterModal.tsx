"use client";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { ImFacebook2 } from "react-icons/im";
import axios from "axios";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form"
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import { useCallback, useState } from "react";
import Heading from "../Heading";
import Input from "../input/Input";
import Button from "../Button";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState : { errors }
    } = useForm<FieldValues>({
        defaultValues : {
            name : "",
            email : "",
            password : ""
        }
    })

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post("/api/register", data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error("Something went wrong!")
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    const toggle = useCallback(() => {
        registerModal.onClose();
        loginModal.onOpen()
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="w-full flex flex-col gap-4 mb-2">
            <Heading 
            title="Welcome to Airbnb"
            subtitle="Create an Account"
            />
            <Input
            id="email"
            label="Email"
            type="text"
            register={register}
            errors={errors}
            />
            <Input
            id="name"
            label="Name"
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
            onClick={() => signIn("google")}
            icon={FcGoogle}
            />
            <Button 
            outline
            label="Continue with Github"
            onClick={() => signIn("github")}
            icon={AiFillGithub}
            />
            <div className="text-neutral-500 text-center mt-2 font-light text-sm mb-2">
                <div className="flex flex-row items-center justify-center gap-2">
                    <div>Already have an account?</div>
                    <div
                    onClick={toggle}
                    className="text-neutral-800 cursor-pointer hover:underline"
                    >
                        Login
                    </div>
                </div>
            </div>
        </div>
    )


    return ( 
        <Modal 
        isOpen={registerModal.isOpen}
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        title="Register"
        body={bodyContent}
        footer={footerContent}
        actionLabel="Continue"
        />
    );
}
 
export default RegisterModal;
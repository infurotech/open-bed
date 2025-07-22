import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up - Open Bed",
  description: "Create your account for Open Bed healthcare management system - Register for bed management, patient tracking, and rehabilitation services",
};

export default function SignUp() {
  return <SignUpForm />;
}

import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In - Open Bed",
  description: "Sign in to Open Bed healthcare management system - Access your dashboard for bed management, patient tracking, and rehabilitation services",
};

export default function SignIn() {
  return <SignInForm />;
}

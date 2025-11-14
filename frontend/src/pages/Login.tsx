import { useForm } from "react-hook-form";
import API from "../api/client";
import { setTokenLocal } from "../stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Login() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    const res = await API.post("/auth/login", data);
    setTokenLocal(res.data.token);
    window.location.href = "/";
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Welcome Back 👋</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input {...register("email")} placeholder="Email" />
            <Input {...register("password")} type="password" placeholder="Password" />

            <Button className="w-full">Login</Button>

            <a href="/forgot" className="text-sm block text-center text-blue-500">
              Forgot Password?
            </a>
            <a href="/signup" className="text-sm block text-center text-gray-500">
              Create an Account
            </a>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

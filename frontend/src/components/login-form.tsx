import { useAuth } from "@/contexts/auth-context";
import { api } from "@/lib/api";
import { loginSchema, LoginSchemaType } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const { setShowModal, refreshUser } = useAuth();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", values);

      const token = res.data;

      localStorage.setItem("token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setShowModal(false);
      refreshUser();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto space-y-6">
      <h2 className="text-center text-xl font-semibold text-gray-800">Login</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="email" placeholder="Email" className="w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type="password" placeholder="Password" className="w-full" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} type="submit" className="w-full">
            {loading && <Loader2 className="size-4 animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;

import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    //   dispatch(loginUser(formData)).then((data) => {
    //     if (data?.payload?.success) {
    //       toast({
    //         title: data?.payload?.message,
    //       });
    //     } else {
    //       toast({
    //         title: data?.payload?.message,
    //         variant: "destructive",
    //       });
    //     }
    //   });
    // }
    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        // Show success toast when login is successful
        toast({
          title: "Login Successful!",
          // description: "You have logged in successfully.",
          variant: "success",
          style: {
            backgroundColor: "#28a745",
            color: "#ffffff",
          },
        });
      } else {
        // Show error toast if login fails
        toast({
          title: "Login Failed",
          description: data?.payload?.message,
          variant: "destructive",
          style: {
            backgroundColor: "#dc3545",
            color: "#ffffff",
          },
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account
          <Link
            className="font-medium ml-2 text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Sign In"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;

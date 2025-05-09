import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthService } from "@/services/auth_service/auth-service";
import { useAuth } from "@/hooks/use-auth";
import { useNavigate } from "react-router";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const {checkAuth} = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log("Login button clicked", { username, password });
    try {
      const response = await AuthService.login(username, password);
      console.log("Login response:", response);
      await checkAuth()
      alert(response.message || "Login successful!");
      navigate("/home");

    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="w-full place-items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Login
          </CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <Button type="submit">Login</Button>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function SignupPage() {
  const [selectedRole, setSelectedRole] = useState("student");
  const navigate = useNavigate();

  // Listen to auth changes
  supabase.auth.onAuthStateChange(async (event, session) => {
    if (event === "SIGNED_IN" && session) {
      // Save selected role
      await supabase
        .from("users")
        .upsert({ id: session.user.id, role: selectedRole }, { onConflict: "id" });

      // Redirect based on role
      if (selectedRole === "admin") navigate("/admin");
      else if (selectedRole === "club") navigate("/club");
      else navigate("/student");
    }
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2 text-indigo-700">Create Account</h1>
        <p className="text-center text-gray-600 mb-6">Choose your role and sign up</p>

        {/* Role Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-lg"
          >
            <option value="student">Student</option>
            <option value="club">Club Chairman</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Google Signup */}
        <div className="border-t pt-6">
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={["google"]}
            onlyThirdPartyProviders={true}
            redirectTo={window.location.origin}
          />
        </div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By signing up, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
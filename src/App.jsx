import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function App() {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) redirectBasedOnRole(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, sess) => {
        setSession(sess);
        if (sess) redirectBasedOnRole(sess);
      }
    );

    return () => listener?.subscription?.unsubscribe();
  }, []);

  async function redirectBasedOn041Role(sess) {
    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", sess.user.id)
      .single();

    if (data?.role === "admin") navigate("/admin");
    else if (data?.role === "club") navigate("/club");
    else navigate("/student");
  }

  const logout = () => supabase.auth.signOut().then(() => navigate("/"));

  if (session) {
    return (
      <div className="p-8 text-center">
        <p>Logged in as {session.user.email}</p>
        <button onClick={logout} className="mt-4 px-6 py-2 bg-red-600 text-white rounded">
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-50 to-pink-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-8">BIIT Hackathon</h1>
        <div className="space-y-4">
          <Link
            to="/signup"
            className="block w-80 mx-full px-6 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Sign Up with Role
          </Link>
          <div className="text-center text-sm text-gray-600">or</div>
          <div className="w-80 mx-auto">
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
              onlyThirdPartyProviders={true}
              redirectTo={window.location.origin}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
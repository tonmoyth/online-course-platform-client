import LoginForm from "@/components/modules/auth/LoginForm";

export default async function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
      <LoginForm />
    </div>
  );
}
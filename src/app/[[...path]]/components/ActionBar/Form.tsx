import { setContextCookies } from "@/app/context/server";

interface FormProps {
  children: React.ReactNode;
}

export async function Form({ children }: FormProps) {
  return (
    <form action={setContextCookies} className="flex gap-2">
      {children}
    </form>
  );
}

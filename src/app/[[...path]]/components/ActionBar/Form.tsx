import { setCookies } from "@/app/context/server";

interface FormProps {
  children: React.ReactNode;
}

export async function Form({ children }: FormProps) {
  return (
    <form action={setCookies} className="flex gap-2">
      {children}
    </form>
  );
}

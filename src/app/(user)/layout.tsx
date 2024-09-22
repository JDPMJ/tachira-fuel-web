import UserNavbar from "@/components/UserNavbar";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <UserNavbar />
      {children}
    </>
  );
}
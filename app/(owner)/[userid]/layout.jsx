import Navigation from "@/app/components/Navigation";

function RootLayout({ children }) {
  return (
    <>
      <html>
        <body>{children}</body>
      </html>
    </>
  );
}

export default RootLayout;

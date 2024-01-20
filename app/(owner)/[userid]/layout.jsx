import Navigation from "@/app/components/Navigation";

function RootLayout({ children }) {
  return (
    <>
      <html>
        <body>{children}</body>
        <Navigation />
      </html>
    </>
  );
}

export default RootLayout;

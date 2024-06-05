import './globals.css';


export const metadata = {
  title: 'Fitness app',
  description: 'A simple app to manage movie lists',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;

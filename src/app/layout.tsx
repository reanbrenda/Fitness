import './globals.css';
import ClientWrapper from './ClientWrapper';

export const metadata = {
  title: 'Fitness app',
  description: 'A simple app to manage movie lists',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <ClientWrapper>
          <main>{children}</main>
        </ClientWrapper>
      </body>
    </html>
  );
};

export default RootLayout;

import React, { FC, ReactNode } from "react";
import Header from './Header';

interface layoutProps {
  children: ReactNode;
}

const Layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className="main">
      <Header />
      <div className="main__body">{children}</div>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;

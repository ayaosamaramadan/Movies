"use client";

import { Provider } from "react-redux";
import ClientProvider from "@/components/providers/ClientProvider";
import { store } from "@/store/store";

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ClientProvider>{children}</ClientProvider>
    </Provider>
  );
};

export default ReduxProvider;

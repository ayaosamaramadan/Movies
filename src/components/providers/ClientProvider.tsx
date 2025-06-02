
"use client";

// import { useEffect } from "react";
// import { useDispatch } from "react-redux";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // Load cart from localStorage when the app initializes
  //   dispatch(initialize());
  // }, [dispatch]);

  return <>{children}</>;
};

export default ClientProvider;

// "use client";
// import { checkAuth } from "../services/dataLogin";
// import { setUser } from "@/hooks/slices/userSlice";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { selectUser } from "../hooks/slices/userSlice";

// const RoutesProtection = ({ children }) => {
//   const user = useSelector(selectUser);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     checkAuth()
//       .then((User) => {
//         if (User) {
//           dispatch(setUser(User));
//         }
//       })
//       .catch(() => {});
//   }, []);
//   return <>{children}</>;
// };

// export default RoutesProtection;

"use client";
import { checkAuth } from "../services/dataLogin";
import { setUser } from "@/hooks/slices/userSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../hooks/slices/userSlice";

const RoutesProtection = ({ children }) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    checkAuth()
      .then((User) => {
        if (User) {
          dispatch(setUser(User));
        }
      })
      .catch(() => {});
  }, []);
  return <>{children}</>;
};

export default RoutesProtection;

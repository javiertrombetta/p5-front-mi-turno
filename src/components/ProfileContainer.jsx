'use client';
import React, { useState } from "react";
import ProfileFormEdit from "@/components/ProfileFormEdit";
import ProfileUserInfo from "@/components/ProfileUserInfo";

const ProfileContainer = () => {
  const [user, setUser] = useState({
    name: "Carlos Menem",
    email: "carlosmenem@example.com",
    phone: "123-456-7890",
    dni: "12345678",
    avatarUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.lXt4sCOL-C23gIIDRrfAvgHaGL%26pid%3DApi&f=1&ipt=63f163e6fa65c11af583d5482fad7dd9831dfedfc1ff7ad4f813c287a077949e&ipo=images"
  });

  const handleUserUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <>
      <ProfileUserInfo user={user} />
      <ProfileFormEdit user={user} onUserUpdate={handleUserUpdate} />
    </>
  );
};

export default ProfileContainer;

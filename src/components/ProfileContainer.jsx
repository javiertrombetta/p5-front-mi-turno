'use client';
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import ProfileFormEdit from "@/components/ProfileFormEdit";
import ProfileUserInfo from "@/components/ProfileUserInfo";

const ProfileContainer = () => {
  const user = useSelector(state => state.auth.user);

  const handleUserUpdate = (updatedUser) => {    
    console.log('Usuario actualizado:', updatedUser);
  };
  return (
    <>
      <ProfileUserInfo user={user} />
      <ProfileFormEdit user={user} onUserUpdate={handleUserUpdate} />
    </>
  );
};

export default ProfileContainer;

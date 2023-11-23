import GenericCard from '@/commons/UserCard';
import UserInfo from '@/commons/UserInfo';

const ProfileUserInfo = ({ user }) => {
  return (
    <GenericCard>
      <UserInfo user={user} />
    </GenericCard>
  );
};

export default ProfileUserInfo;



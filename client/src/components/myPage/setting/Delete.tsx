import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SettingBody, SettingForm } from './styles';
import {MyPageHeader} from '../MyPageHeader';
import { deleteUser } from '../../../api/myPage/delete';

export const Delete = () => {
  //const userId = localStorage.getItem('userId')
  const userId = '12345';

  const [error, setError] = useState('');

  const handleDelete = async () => {
    // 회원 탈퇴 함수 호출
    const { success, error: errorMessage } = await deleteUser(userId);
    if (success) {
      // 회원 탈퇴 성공 시
      console.log('회원 탈퇴가 성공적으로 처리되었습니다.');
    } else {
      // 회원 탈퇴 실패 시
      setError(errorMessage || '회원 탈퇴에 실패했습니다.');
    }
  };

  return (
    <div>
      <div>
        <MyPageHeader />
      </div>
      <SettingBody>
        <div></div>
        <SettingForm>
          <p>회원을 탈퇴하시겠습니까?</p>
          <Link to="/">
            <button onClick={handleDelete}>예</button>
            {error && <div>{error}</div>}
          </Link>
          <Link to="/mypage">
            <button>아니요</button>
          </Link>
        </SettingForm>
        <div></div>
      </SettingBody>
    </div>
  );
};

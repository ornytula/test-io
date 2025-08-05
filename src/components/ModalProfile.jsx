import { useContext } from 'react';
import ModalWrapper from "./ModalWrapper";
import { AuthContext } from '../services/AuthContext';

export default function ProfileModal({ onClose, user }) {
  const { logout } = useContext(AuthContext);

  return (
    <ModalWrapper title="Личный кабинет" onClose={onClose}>
      <div className="profile-box">
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Имя:</strong> {user?.name}</p>
        <button className="logout-btn" onClick={() => { logout(); onClose(); }}>Выйти</button>
      </div>
    </ModalWrapper>
  );
}

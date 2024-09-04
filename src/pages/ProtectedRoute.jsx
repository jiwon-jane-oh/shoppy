import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireAdmin }) {
  // 로그인한 사용자가 있는지확인
  // 그사용자가 어드민권한이 있는지 확인
  //requireAdmin 이 true 인 경우이는 로그인 && 어드민
  //조건에 맞지않으면 / 경로로 이동
  // 조건에 맞는경우 전달된 children으로  이동

  const { user } = useAuthContext();
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to="/" replace />;
  }
  return children;
}

// import { useQueryClient } from '@tanstack/react-query';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function useCarts() {
  const { uid } = useAuthContext();
  const queryClient = useQueryClient();

  const cartQuery = useQuery({
    //사용자별로 cache되도록 설정
    queryKey: ['carts', uid || ''],
    queryFn: () => getCart(uid),
    // -> uid가 존재하는경우만 쿼리실행
    enabled: !!uid,
  });

  const addOrUpdateItem = useMutation({
    mutationFn: (product) => addOrUpdateToCart(uid, product),
    // 사용자 uid 에 한해서 carts cache invalidate ->로그인한 사용자 카트만 invalidate
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });

  const removeItem = useMutation({
    mutationFn: (id) => removeFromCart(uid, id),
    // 사용자 uid 에 한해서 carts cache invalidate ->로그인한 사용자 카트만 invalidate
    onSuccess: () => queryClient.invalidateQueries(['carts', uid]),
  });
  return { cartQuery, addOrUpdateItem, removeItem };
}

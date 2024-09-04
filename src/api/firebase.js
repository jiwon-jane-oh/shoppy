import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { get, getDatabase, ref, remove, set } from 'firebase/database';
import { v4 as uuid } from 'uuid';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth);
}

export function onUserStateChange(callback) {
  // user 상태가 변할때마다 자동으로 호출
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;

    callback(updatedUser);
  });
}

async function adminUser(user) {
  //2.사용자가 어드민 권한을 가지고 있는지 확인
  //3{...user, isAdmin :true/false}
  return get(ref(database, 'admins/')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

export async function addNewProduct(product, imageURL) {
  const id = uuid();
  console.log(product, imageURL);
  return set(ref(database, `products/${id}`), {
    ...product,
    id,
    price: parseInt(product.price),
    image: imageURL,
    options: product.options.split(','),
  });
}

export async function getProducts() {
  //2.사용자가 어드민 권한을 가지고 있는지 확인
  //3{...user, isAdmin :true/false}
  return get(ref(database, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log('sn:', snapshot.val());
        return Object.values(snapshot.val());
      }
      return [];
    });
}

export async function getCart(userId) {
  return get(ref(database, `carts/${userId}`)) //
    .then((snapshot) => {
      const items = snapshot.val() || {};
      console.log('cart items:', Object.values(items));
      return Object.values(items);
    });
}
export async function addOrUpdateToCart(userId, product) {
  return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
  return remove(ref(database, `carts/${userId}/${productId}`));
}

export async function getCartFromProduct(userId, productId) {
  return get(ref(database, `carts/${userId}/${productId}`)) //
    .then((snapshot) => {
      const item = snapshot.val() || {};
      console.log('cart items:', item);
      // return Object.values(items)
      return item;
    });
}

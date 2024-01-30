// import { auth } from "./firebase";
import { getFirestore, getDoc, doc } from "firebase/firestore";

const db = getFirestore();

// ユーザーが「admin」ロールを持っているかどうかを確認する関数
const checkAdminRole = async (uid: string) => {
  const roleDocRef = doc(db, "roles", uid);

  try {
    const roleDocSnapshot = await getDoc(roleDocRef);

    if (roleDocSnapshot.exists()) {
      const role = roleDocSnapshot.data().role;
      return role === "admin";
    } else {
      return false;
    }
  } catch (error) {
    console.error("Adminロールを確認中にエラーが発生しました:", error);
    return false;
  }
};

export { checkAdminRole };

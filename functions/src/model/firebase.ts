import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../keys/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export const db = admin.firestore();

export const getTimestamp = (timestamp: number): admin.firestore.Timestamp => {
  return admin.firestore.Timestamp.fromDate(new Date(timestamp));
};

export const getCreateAtTimestamp = (): FirebaseFirestore.FieldValue => {
  return admin.firestore.FieldValue.serverTimestamp();
};

import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../keys/serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export { admin as admin };

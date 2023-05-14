import { SetMetadata } from '@nestjs/common';

export const IS_FIREBASE_ACCESSIBLE = 'is_firebase_accessible';
export const FirebaseAccessible = () =>
    SetMetadata(IS_FIREBASE_ACCESSIBLE, true);

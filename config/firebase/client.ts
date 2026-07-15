// IMPORTS 
// ------------------------------------------------------------------------------
import { CONFIG } from '@/config/app';
import { getAuth } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// ----------------------------------------------------------------------

export const APP = initializeApp(CONFIG.firebase);
export const AUTH = getAuth(APP);
export const FIRESTORE = getFirestore(APP, CONFIG.firestore);
export const STORAGE = getStorage(APP, CONFIG.storage);
export const FUNCTIONS = getFunctions(APP , CONFIG.region);
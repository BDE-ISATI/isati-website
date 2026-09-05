import PocketBase from 'pocketbase';
import type { TypedPocketBase } from '@/shared/types/pocketbase-types'

const pb = new PocketBase(import.meta.env.VITE_PB_URL) as TypedPocketBase;

export default pb;
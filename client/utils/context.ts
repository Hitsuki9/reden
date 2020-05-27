import { createContext, Dispatch } from 'react';
import { noop } from '.';

export const UserOrGroupInfoContext = createContext<Dispatch<any>>(noop);

'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export function ReduxProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) {
  return (
    <SessionProvider session={session}>
      <Provider store={store}>{children}</Provider>;
    </SessionProvider>
  );
}

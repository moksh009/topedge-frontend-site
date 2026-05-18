import { createContext, useContext } from 'react';

type MockupDisplay = {
  float: boolean;
  glow: boolean;
};

const defaults: MockupDisplay = { float: true, glow: true };

const MockupDisplayContext = createContext<MockupDisplay>(defaults);

export function MockupDisplayProvider({
  children,
  float = true,
  glow = true,
}: {
  children: React.ReactNode;
  float?: boolean;
  glow?: boolean;
}) {
  return (
    <MockupDisplayContext.Provider value={{ float, glow }}>{children}</MockupDisplayContext.Provider>
  );
}

export function useMockupDisplay() {
  return useContext(MockupDisplayContext);
}

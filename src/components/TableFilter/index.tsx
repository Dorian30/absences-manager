import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch
} from 'react';

export interface IBaseProps {
  className?: string;
  children: ReactNode;
}

export interface IFilterContext {
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

const Context = createContext<IFilterContext | null>(null);

function useFilterContext() {
  const context = useContext(Context);

  if (!context) {
    throw new Error(
      `Filter compound components cannot be rendered outside the Filter component`
    );
  }

  return context;
}

export function TableFilter({ className = '', children }: IBaseProps) {
  const [isActive, setIsActive] = useState(false);

  return (
    <Context.Provider value={{ isActive, setIsActive }}>
      <div className={className}>{children}</div>
    </Context.Provider>
  );
}

// Compound components
function Header({
  children
}: {
  children: (props: IFilterContext) => JSX.Element;
}) {
  const context = useFilterContext();

  return children({ ...context });
}

function Menu({ className = '', children }: IBaseProps) {
  const { isActive } = useFilterContext();

  return isActive ? <div className={className}>{children}</div> : null;
}

TableFilter.Header = Header;
TableFilter.Menu = Menu;

import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

interface ButtonProps {
  to?: string;
  href?: string;
  type?: string;
  primary?: boolean;
  outline?: boolean;
  disable?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children: string | number | ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Button({
  to,
  href,
  type,
  primary,
  outline,
  disable = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  onClick,
}: ButtonProps) {
  let Comp: any = 'button';
  const props: any = {
    type,
    onClick,
  };

  if (disable) {
    Object.keys(props).forEach((key) => {
      if (key.startsWith('on') && typeof props[key] === 'function') {
        delete props[key];
      }
    });
  }

  if (to) {
    props.to = to;
    Comp = Link;
  } else if (href) {
    props.href = href;
    Comp = 'a';
  }
  return (
    <Comp
      className={clsx(
        'flex cursor-pointer items-center justify-center gap-2 duration-500',
        {
          'bg-primary rounded-lg text-white hover:bg-orange-600 hover:shadow-2xl':
            primary,
          'text-skyBlue-700 underline outline-0': outline,
          '!cursor-not-allowed opacity-30': disable,
        },
        className,
      )}
      {...props}
    >
      {leftIcon && <span className="icon">{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className="icon">{rightIcon}</span>}
    </Comp>
  );
}

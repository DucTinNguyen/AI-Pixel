/* eslint-disable prettier/prettier */
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
}

const buttonVariants = cva([], {
  variants: {
    variant: {
      default: {
        primary: "#3F4961",
        secondary: "#8B98B8",
        accent: "#101729",
      },
      orange: {
        primary: "#E17C3C",
        secondary: "#FDC840",
        accent: "#55162B",
      },
      mixed: {
        primary: "#3F4961",
        secondary: "#FDC840",
        accent: "#55162B",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface StyledButtonProps extends ButtonVariants {
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  variant,
  className,
  onClick,
  children,
}) => {
  const colors: ColorTheme = buttonVariants({
    variant,
  }) as unknown as ColorTheme;

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center relative ${className}`}
      type="button"
      style={{ width: "208px", height: "49px" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="208"
        height="49"
        viewBox="0 0 208 49"
        fill="none"
        className="absolute top-0 left-0"
      >
        <rect
          width="200"
          height="45"
          transform="matrix(-1 0 0 1 204 0)"
          fill={colors.primary}
        />
        <rect
          width="2"
          height="45"
          transform="matrix(-1 0 0 1 206 0)"
          fill={colors.secondary}
        />
        <rect
          width="2"
          height="45"
          transform="matrix(-1 0 0 1 208 0)"
          fill={colors.accent}
        />
        <rect
          width="2"
          height="2"
          transform="matrix(-1 0 0 1 4 45)"
          fill={colors.accent}
        />
        <rect
          width="2"
          height="45"
          transform="matrix(-1 0 0 1 4 0)"
          fill={colors.secondary}
        />
        <rect
          width="2"
          height="45"
          transform="matrix(-1 0 0 1 2 0)"
          fill={colors.accent}
        />
        <rect
          width="86"
          height="2"
          transform="matrix(-1 0 0 1 90 45)"
          fill={colors.secondary}
        />
        <rect
          width="86"
          height="2"
          transform="matrix(-1 0 0 1 90 47)"
          fill={colors.accent}
        />
        <rect
          width="4"
          height="2"
          transform="matrix(-1 0 0 1 94 43)"
          fill={colors.secondary}
        />
        <rect
          width="4"
          height="2"
          transform="matrix(-1 0 0 1 94 45)"
          fill={colors.accent}
        />
        <rect
          width="4"
          height="2"
          transform="matrix(-1 0 0 1 98 45)"
          fill={colors.secondary}
        />
        <rect
          width="4"
          height="2"
          transform="matrix(-1 0 0 1 98 47)"
          fill={colors.accent}
        />
        <rect
          width="10"
          height="2"
          transform="matrix(-1 0 0 1 108 43)"
          fill={colors.secondary}
        />
        <rect
          width="10"
          height="2"
          transform="matrix(-1 0 0 1 108 45)"
          fill={colors.accent}
        />
        <rect
          width="88"
          height="2"
          transform="matrix(-1 0 0 1 196 45)"
          fill={colors.secondary}
        />
        <rect
          width="88"
          height="2"
          transform="matrix(-1 0 0 1 196 47)"
          fill={colors.accent}
        />
        <rect
          width="2"
          height="2"
          transform="matrix(-1 0 0 1 198 43)"
          fill={colors.secondary}
        />
        <rect
          width="2"
          height="2"
          transform="matrix(-1 0 0 1 198 45)"
          fill={colors.accent}
        />
        <rect
          width="2"
          height="2"
          transform="matrix(-1 0 0 1 206 45)"
          fill={colors.accent}
        />
        <rect
          width="6"
          height="2"
          transform="matrix(-1 0 0 1 204 45)"
          fill={colors.secondary}
        />
        <rect
          width="6"
          height="2"
          transform="matrix(-1 0 0 1 204 47)"
          fill={colors.accent}
        />
      </svg>
      {children && <span className="relative z-10 text-white">{children}</span>}
    </button>
  );
};

export default StyledButton;

import React, { memo } from "react";
import styles from "./Container.module.css";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "narrow" | "wide" | "full";
  className?: string;
}

/**
 * @component Container
 * @description Layout boundary component strictly bound to design token gutters.
 */
export const Container = memo(function Container({
  children,
  size = "default",
  className = "",
  ...props
}: ContainerProps) {
  const sizeClass = styles[size] || styles.default;

  return (
    <div className={`${styles.container} ${sizeClass} ${className}`} {...props}>
      {children}
    </div>
  );
});

export default Container;


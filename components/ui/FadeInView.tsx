import StyledMotiView from "./StyledMotiView";
export default function FadeInView({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <StyledMotiView
      className={className}
      from={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "timing", duration: 100 }}
    >
      {children}
    </StyledMotiView>
  );
}

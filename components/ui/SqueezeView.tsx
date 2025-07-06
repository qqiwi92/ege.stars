import { MotiPressable } from "moti/interactions";
import { cssInterop } from "nativewind";


const StyledMotiPressable = cssInterop(MotiPressable, {
  className: {
    target: "style",
  },
});


export default function SqueezeView({
  children,
  onPress,className
}: {
  children: React.ReactNode;
  onPress: () => void;
  className:string
}) {
  return (
    <StyledMotiPressable
      onPress={onPress}
      className={className}
      animate={({ pressed }) => {
        "worklet";
        return {
          scale: pressed ? 0.95 : 1,
          opacity: pressed ? 0.7 : 1,
        };
      }}
      transition={{
        type: "timing",
        duration: 100,
      }}
      style={{ alignSelf: "center" }}
    >
      {children}
    </StyledMotiPressable>
  );
}

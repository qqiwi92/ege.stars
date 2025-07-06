import { MotiView } from "moti";
import { cssInterop } from "nativewind";

const StyledMotiView = cssInterop(MotiView, {
  className: {
    target: "style",
  },
});
export default StyledMotiView;
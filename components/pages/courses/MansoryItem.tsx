import { H2, P } from "@/components/ui/typography";
import { Excercise } from "@/lib/types/Excercise";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

function MasonryItem({ data }: { data: Excercise }) {
  return (
    <Animated.View
      layout={Layout.springify()}
      entering={FadeIn}
      exiting={FadeOut}
      className="flex flex-col items-center p-3 bg-card mr-2 mt-2 rounded-xl"
    >
      <H2>{data.id}</H2>
      <P className="text-foreground/80">{data.title}</P>
    </Animated.View>
  );
}
export default MasonryItem;

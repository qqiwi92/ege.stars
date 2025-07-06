import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/typography";
import { Excercise } from "@/lib/types/Excercise";
import { useState } from "react";
import { FlatList, LayoutChangeEvent, View } from "react-native";
import { Text } from "@/components/ui/text";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Pressable } from "react-native";
import { Course } from "@/lib/types/Course";
import useCheatSheet from "@/lib/fetching/useCheatSheet";
import { CloudDownload } from "@/lib/icons/cloud-download";
import GradientScrollViewWrapper from "@/components/ui/GradientScrollViewWrapper";
import { useRouter } from "expo-router";
import { useTheme } from "@react-navigation/native";
import SqueezeView from "@/components/ui/SqueezeView";
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function MasonryItem({
  excercise,
  course,
}: {
  excercise: Excercise;
  course: Course;
}) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));
  const [width, setWidth] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  const router = useRouter();
  const {
    data: cheatSheet,
    error,
    isLoading,
  } = useCheatSheet({
    courseName: course.name,
    excersiceID: excercise.id,
  });
  return (
    <>
      <AnimatedPressable
        onLayout={onLayout}
        onPress={() => {
          setDialogOpen(true);
          scale.value = withSpring(1);
        }}
        onPressIn={() => {
          scale.value = withSpring(0.95);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        layout={LinearTransition}
        entering={FadeIn}
        style={[{ minHeight: width }, animatedStyle]}
        className="mr-2 mt-2 flex flex-col items-center justify-between rounded-xl bg-card p-3"
      >
        <H2 className="w-full text-left">{excercise.id}</H2>
        <P className="w-full text-start text-xl text-foreground/80">
          {excercise.title}
        </P>
      </AnimatedPressable>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="relative bg-card">
          <View className="absolute -top-14 right-0 rounded-xl border border-destructive bg-card px-4 py-2">
            <P
              onPress={() => setDialogOpen(false)}
              className="text-destructive"
            >
              закрыть
            </P>
          </View>
          <DialogHeader>
            <DialogTitle>Шпаргалка</DialogTitle>
            <DialogDescription className="pr-10">
              {excercise.title}
            </DialogDescription>
          </DialogHeader>
          <P className="absolute  right-2 top-2 z-10 rounded-md border border-border bg-card px-4 py-2">
            №{excercise.id}
          </P>
          <View className="mb-5 flex h-full max-h-96 flex-1 gap-3">
            <GradientScrollViewWrapper shadeColor={colors.card}>
              {(onScroll) => (
                <FlatList
                  onScroll={onScroll}
                  data={cheatSheet}
                  keyExtractor={(item) => item.title}
                  renderItem={({ item: lesson }) => (
                    <SqueezeView
                      onPress={() => {
                        setDialogOpen(false);
                        router.push(
                          `/courses/${course.name}/cheat/${lesson.id}`,
                        );
                      }}
                      key={lesson.title}
                      className="mb-3 flex w-full flex-1 flex-row flex-nowrap items-start justify-start gap-3 rounded-xl border border-border p-3  "
                    >
                      <View className="size-14 rounded-xl bg-foreground/30" />
                      <View className="flex w-[80%] max-w-md ">
                        <P className="">{lesson.title}</P>
                        <View className="flex flex-1 flex-row items-center justify-between ">
                          <P className="text-foreground">
                            ≈{lesson.estTimeInMin}min
                          </P>
                          <CloudDownload className="stroke-foreground/80" />
                        </View>
                      </View>
                    </SqueezeView>
                  )}
                />
              )}
            </GradientScrollViewWrapper>
          </View>
          <DialogFooter>
            <DialogClose asChild>
              <Button>
                <Text>OK</Text>
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MasonryItem;

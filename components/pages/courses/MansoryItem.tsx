import { Button } from "@/components/ui/button";
import { H2, P } from "@/components/ui/typography";
import { Excercise } from "@/lib/types/Excercise";
import { useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Text } from "@/components/ui/text";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
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
import { Pressable } from "react-native-gesture-handler";
import { Course } from "@/lib/types/Course";
import useCheatSheet from "@/lib/fetching/useCheatSheet";
import { CloudDownload } from "@/lib/icons/cloud-download";

function MasonryItem({
  excercise,
  course,
}: {
  excercise: Excercise;
  course: Course;
}) {
  const [width, setWidth] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const onLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };
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
      <Pressable onPress={() => setDialogOpen(true)}>
        <Animated.View
          onLayout={onLayout}
          layout={LinearTransition.springify()}
          entering={FadeIn}
          exiting={FadeOut}
          style={{ minHeight: width }}
          className="mr-2 mt-2 flex flex-col items-center justify-between rounded-xl bg-card p-3"
        >
          <H2 className="w-full text-left">{excercise.id}</H2>
          <P className="w-full text-start text-xl text-foreground/80">
            {excercise.title}
          </P>
        </Animated.View>
      </Pressable>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className=" mx-  relative">
          <View className="absolute -top-14 right-0 rounded-xl border border-destructive px-4 py-2">
            <P className="text-destructive">закрыть</P>
          </View>
          <DialogHeader>
            <DialogTitle>Шпаргалка</DialogTitle>
            <DialogDescription className="pr-10">
              {excercise.title}
            </DialogDescription>
          </DialogHeader>
          <P className="absolute right-2 top-2 z-10 rounded-xl border bg-card px-4 py-2">
            {excercise.id}
          </P>
          <View className="flex gap-3 mb-5">
            {cheatSheet?.map((lesson) => {
              return (
                <View
                  key={lesson.title}
                  className="flex flex-row items-start justify-start gap-3 "
                >
                  <View className="size-14 rounded-xl bg-card" />
                  <View className="flex w-[80%] max-w-md">
                    <P className="">{lesson.title}</P>
                    <View className="flex flex-1 flex-row justify-between items-center ">
                      <P className="text-foreground">≈{lesson.estTimeInMin}min</P>
                      <CloudDownload className="stroke-foreground/80"/>
                    </View>
                  </View>
                </View>
              );
            })}
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

import Practice from "@/components/pages/lesson/Practice";
import Test from "@/components/pages/lesson/Test";
import Theory from "@/components/pages/lesson/Theory";
import { Button } from "@/components/ui/button";
import FadeInView from "@/components/ui/FadeInView";
import { P } from "@/components/ui/typography";
import useLesson from "@/lib/fetching/useLesson";
import { ArrowRight } from "@/lib/icons/arrow-right";
import { BookOpen } from "@/lib/icons/bookOpen";
import { House } from "@/lib/icons/house";
import { useTheme } from "@react-navigation/native";
import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import { useWindowDimensions, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";

export default function Lesson() {
  let { lesson_id } = useLocalSearchParams();
  lesson_id = typeof lesson_id === "string" ? lesson_id : ""; // для тс
  const {
    data: lessonData,
    isLoading,
    isError,
  } = useLesson({ lessonId: lesson_id });
  // console.log(lessonData);
  const router = useRouter();
  const { colors } = useTheme();
  const { width, height } = useWindowDimensions();

  if (isLoading) {
    const fullWidth = Math.min(500, width - 20);
    return (
      <>
        <Stack.Screen
          options={{ title: "Загрузка", headerTitleAlign: "center" }}
        />
        <FadeInView className="flex h-full w-full flex-1 items-start justify-start gap-5 px-3 pt-10">
          <View className="mx-auto flex w-full items-center justify-center">
            <View className="overflow-hidden rounded-xl border border-border">
              <Skeleton
                backgroundColor={colors.card}
                colors={[colors.background, colors.card, colors.text]}
                width={fullWidth}
                height={200}
              ></Skeleton>
            </View>
          </View>

          <View className="overflow-hidden rounded-xl border border-border">
            <Skeleton width={fullWidth - 30} height={45} />
          </View>
          <View style={{ height: 1 }} className="w-full border-border"></View>
          <View
            style={{ width: fullWidth }}
            className="mt-10 flex h-full flex-wrap items-start  gap-3 "
          >
            {[
              [58.28, 31.03, 86.07, 42.76, 69.66],
              [34.48, 79.31, 48.28, 90.0, 60.69],
              [33.1, 74.83, 52.41, 64.14, 81.38],
              [40.34, 56.9, 70.38, 36.21, 62.07],
              [45.17, 87.93, 50.38, 78.62, 66.55],
              [32.76, 54.83, 38.59, 71.03, 88.28],
            ].map((i, ii) => (
              <View key={`layout-${ii}`} className="mb-3 flex flex-row gap-3">
                {i.map((j, ji) => (
                  <View
                    className="flex flex-row gap-3 rounded-md border border-foreground/25"
                    key={`sk-${ii}-${ji}`}
                  >
                    <Skeleton
                      // show={false}
                      transition={{ delay: ji + ii }}
                      width={j}
                      height={30}
                    />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </FadeInView>
      </>
    );
  }
  return (
    <>
      <Stack.Screen
        options={{
          title: "Шпаргалка",
          headerTitleAlign: "center",
          headerRight: () => (
            <Pressable onPress={() => router.push("/")}>
              <House className="size-6 stroke-foreground text-foreground opacity-100 " />
            </Pressable>
          ),
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <ArrowRight className="size-6  rotate-180 stroke-foreground text-foreground opacity-100 " />
            </Pressable>
          ),
        }}
      />
      <FadeInView className="flex  h-full w-full flex-1 items-center justify-center">
        {lessonData?.type === "theory" ? (
          <Theory lessonData={lessonData} />
        ) : lessonData?.type === "practice" ? (
          <Practice lessonData={lessonData} />
        ) : lessonData?.type === "test" ? (
          <Test lessonData={lessonData} />
        ) : (
          <Redirect href="/" />
        )}
      </FadeInView>
    </>
  );
}

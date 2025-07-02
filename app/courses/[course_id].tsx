import { H1, P } from "@/components/ui/typography";
import { View } from "react-native";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import useCourse from "@/lib/fetching/useCourse";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "@/lib/icons/arrow-right";

export default function Course() {
  const { course_id } = useLocalSearchParams();
  const router = useRouter();
  const course = useCourse({
    course_id: typeof course_id === "string" ? course_id : "",
  });
  if (typeof course_id !== "string" || !course_id) return null;
  return (
    <View className="h-full w-full flex-1">
     
      <Stack.Screen
        name="Course"
        options={{
          title: course.name,
          //   headerTitleAlign: "center",
          headerLeft: () => (
            <Button
              variant="ghost"
              onPress={() => router.back()}
              className="ml-2"
            >
              <ArrowRight className="size-6  rotate-180 stroke-foreground text-foreground opacity-100 " />
            </Button>
          ),
        }}
      />
      <H1>Course: {course.name}</H1>
    </View>
  );
}

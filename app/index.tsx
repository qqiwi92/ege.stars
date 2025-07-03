import { H1, H2, P } from "@/components/ui/typography";
import { useTheme } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import useUser from "@/lib/fetching/useUser";
import { View, TouchableWithoutFeedback } from "react-native";
import { ArrowRight } from "@/lib/icons/arrow-right";
import { CircleQuestionMark } from "@/lib/icons/question-circle";
import { Clock1 } from "@/lib/icons/clock";
import { Button } from "@/components/ui/button";
import { Href, Redirect, useRouter } from "expo-router";

const subjectData = [
  {
    name: "русский язык",
    progress: 80,
    new: 2,
    available: true,
    id: 1,
  },
  {
    name: "математика",
    progress: 60,
    new: 1,
    available: false,
    id: 2,
  },
];

export default function Index() {
  const { data, error } = useUser();
  const { colors } = useTheme();
  const router = useRouter();
    return Redirect({href: '/courses/2'})
  
  return (
    <SafeAreaView className="flex h-full flex-1 items-center justify-start gap-5  px-6 pt-10">
      <H2 className=" border-b border-border">С возвращением, {data?.name}!</H2>
      <View
        onTouchEndCapture={() => console.log("hey")}
        className="flex flex-row justify-between"
      >
        <View className="w-full justify-start">
          <P className="text-2xl">Мои курсы</P>
          <View className="flex flex-row  items-center gap-2">
            <P className="text-foreground/80">3 курса</P>
            <CircleQuestionMark className="size-5 stroke-foreground/80" />
          </View>
        </View>
        {/* <ArrowRight/> */}
      </View>
      <View className="flex gap-3">
        {subjectData.map((subject, index) => {
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                router.push({
                  pathname: "/courses/[course_id]",
                  params: {
                    course_id: subject.id,
                  },
                });
              }}
            >
              <View className=":scale-90 relative transition">
                {subject.available === false && (
                  <View className="absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-row items-center justify-normal gap-3  rounded-xl bg-secondary px-3 py-2">
                    <Clock1 className="stroke-secondary-foreground" />
                    <P className="text-secondary-foreground">скоро</P>
                  </View>
                )}
                <View
                  className={`relative flex w-full flex-row justify-between rounded-xl border border-border bg-card p-5 ${
                    subject.available === false
                      ? "cursor-not-allowed opacity-50"
                      : ""
                  }`}
                >
                  <P className="absolute -left-2 -top-2 size-7 rounded-full border bg-primary text-center text-primary-foreground">
                    {subject.new}
                  </P>

                  <P>{subject.name}</P>
                  <View className="relative flex w-[100px] items-center justify-center overflow-hidden rounded-xl border border-foreground">
                    <P className="absolute left-3 top-1/2 z-10 -translate-y-1/2 font-semibold text-primary-foreground">
                      {subject.progress}%
                    </P>
                    <View
                      className=""
                      style={{
                        position: "absolute",
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: `${subject.progress}%`,
                        height: "100%",
                        backgroundColor: colors.primary,
                      }}
                    />
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </View>

      <Button variant={"outline"}>
        <P className="text-center">приобрести курс</P>
      </Button>
    </SafeAreaView>
  );
}

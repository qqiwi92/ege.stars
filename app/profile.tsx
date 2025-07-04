import ContributionMatrix from "@/components/contributionMatrix";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { H1, H2, H3, P } from "@/components/ui/typography";
import useUser from "@/lib/fetching/useUser";
import { Settings } from "@/lib/icons/settings";
import { Share } from "@/lib/icons/share";
import { Star } from "@/lib/icons/star";
import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
export default function Profile() {
  const { data, error } = useUser();
  const { colors } = useTheme();
  const [sendNotifications, setSendNotifications] = useState(false);
  const achievements = [
    {
      name: "первый",
      description: "ты первый посетитель нашего приложения",
      color: "stroke-yellow-500 fill-yellow-500",
    },
    {
      name: "трудяга",
      description: "ты зашел сюда уже 1000 раз",
      color: "stroke-red-500 fill-red-500",
    },
    {
      name: "не позорься",
      description: "оставил первый коментарий",
      color: "stroke-purple-500 fill-purple-500",
    },
  ];
  return (
    <>
      <View className=" flex h-full w-full flex-1 items-center justify-center gap-5 ">
        <View className="relative mb-3 flex w-full flex-row items-end justify-start gap-5 bg-card px-3 pb-2 pt-10">
          <Avatar
            alt="hey"
            style={{
              width: 100,
              height: 100,
              borderWidth: 2,
              borderColor: colors.text,
            }}
            className="translate-y-5"
          >
            <AvatarImage
              source={{ uri: data?.avatar_url }}
              style={{ width: 100, height: 100, borderRadius: 24 }}
            />
            <AvatarFallback className="flex items-center justify-center">
              <Text className="text-2xl">{data?.name?.split(" ")[0]}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex flex-col">
            <H1>{data?.name}</H1>
            <P className="text-foreground/80">dmtrlevkn@gmail.com</P>
          </View>
          <View className="absolute right-2 top-12 flex flex-row items-center justify-center">
            <Button variant={"ghost"}>
              <Share className="stroke-foreground/80" />
            </Button>
            <Button variant={"ghost"}>
              <Settings className="stroke-foreground/80" />
            </Button>
          </View>
        </View>
        <View className=" flex flex-1 flex-col gap-3 px-3">
          <View className="flex w-full gap-3">
            <H2 className="text-3xl">Достижения</H2>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              className="flex flex-row gap-3"
            >
              {achievements.map((achievement) => (
                <View
                  key={achievement.name}
                  className="mr-3 rounded-xl border border-border bg-card p-3"
                >
                  <Star className={achievement.color} />
                  <H3>{achievement.name}</H3>
                  <P>{achievement.description}</P>
                </View>
              ))}
            </ScrollView>
          </View>
          <View className="flex w-full flex-row items-center justify-between gap-3 pr-2">
            <H2 className="">Напоминания</H2>
            <Switch
              checked={sendNotifications}
              onCheckedChange={setSendNotifications}
              nativeID="notifications"
            />
          </View>
          <View className="flex gap-3">
            <H2 className="">Активность</H2>
            <ContributionMatrix />
          </View>
        </View>
      </View>
    </>
  );
}

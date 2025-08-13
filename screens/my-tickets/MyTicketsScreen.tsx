import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/context/theme.context";
import { scale, verticalScale } from "react-native-size-matters";
import IconSix from "@/assets/svgs/support-center/six";
import { fontSizes } from "@/themes/app.constant";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import useUser from "@/hooks/fetch/useUser";
import { staticTickets } from "@/configs/constants";


export default function MyTicketsScreen() {
  const { theme } = useTheme();
  const { user } = useUser();

  // Combine user tickets with static tickets (use static if no user tickets)
  const allTickets = (user?.Tickets && user.Tickets.length > 0) ? user.Tickets : staticTickets;

  return (
    <View style={{ flex: 1, backgroundColor: theme.dark ? "#101010" : "#fff" }}>
      <View
        style={{
          height: verticalScale(250),
          backgroundColor: theme.dark ? "#8673FC" : "#9DCDFF",
          paddingTop: verticalScale(45),
          paddingHorizontal: scale(20),
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Pressable
          style={{
            width: scale(35),
            height: scale(35),
            backgroundColor: "#fff",
            borderRadius: scale(5),
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </Pressable>
        <Text
          style={{
            textAlign: "center",
            fontSize: fontSizes.FONT28,
            color: "#fff",
            fontFamily: "Poppins_600SemiBold",
            position: "absolute",
            top: verticalScale(50),
            left: scale(120),
          }}
        >
          My Tickets
        </Text>
        <View style={{ flexDirection: "row" }}>
          <IconSix />
        </View>
      </View>

      <ScrollView style={{ padding: scale(15) }}>
        {allTickets.slice()
          .reverse()
          .map((item: TicketsTypes, index: number) => (
            <Pressable
              style={{
                backgroundColor: theme.dark ? "#3c43485c" : "#eaf3fb85",
                borderRadius: scale(10),
                shadowOpacity: 0.1,
                shadowColor: "#40E0D0",
                shadowRadius: 5,
                padding: scale(10),
                marginTop: verticalScale(20),
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              key={index}
              // onPress={() =>
              //   router.push({
              //     pathname: "/(routes)/support-chat",
              //     params: { ticket: JSON.stringify(item) },
              //   })
              // }
            >
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    color: !theme.dark ? "#000" : "#fff",
                    fontSize: fontSizes.FONT22,
                    fontFamily: "Poppins_500Medium",
                  }}
                >
                  {item.ticketTitle}
                </Text>
                <Text
                  style={{
                    color: theme.dark ? "#ccc" : "#666",
                    fontSize: fontSizes.FONT16,
                    fontFamily: "Poppins_400Regular",
                    marginTop: verticalScale(2),
                  }}
                >
                  Created: {new Date(item.createdAt).toLocaleDateString()}
                </Text>
              </View>
              <Text
                style={{
                  color:
                    item.status === "Closed"
                      ? "#19C964" // Green for closed tickets
                      : item.status === "Pending"
                      ? "#FF6B6B" // Red for pending tickets
                      : theme.dark
                      ? "#fff"
                      : "#000", // Default color for other status
                  fontSize: fontSizes.FONT18,
                  opacity: item?.status === "Pending" ? 0.8 : 1,
                  fontFamily: "Poppins_600SemiBold",
                  paddingHorizontal: scale(10),
                  paddingVertical: verticalScale(5),
                  backgroundColor: 
                    item.status === "Closed"
                      ? "#19C96420" // Light green background for closed
                      : item.status === "Pending"
                      ? "#FF6B6B20" // Light red background for pending
                      : "transparent",
                  borderRadius: scale(8),
                  textAlign: "center",
                  minWidth: scale(80),
                }}
              >
                {item.status}
              </Text>
            </Pressable>
          ))}
      </ScrollView>
    </View>
  );
}

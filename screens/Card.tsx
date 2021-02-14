import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { useState } from "react";
import { ImageSourcePropType } from "react-native";
import { View, Text, Image, ScrollView, Alert, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import ClockSVG from "../components/svgs/Clock";
import LeftArrowSVG from "../components/svgs/LeftArrow";
import StarSVG from "../components/svgs/Star";
import { MainStackParamList } from "./Main";

interface IIngredients {
  name: string;
  image: ImageSourcePropType;
}

let ingredients: IIngredients[] = [
  {
    name: "salmon",
    image: require("../assets/icons/salmon.png"),
  },
  {
    name: "avacado",
    image: require("../assets/icons/avacado.png"),
  },
  {
    name: "tomato",
    image: require("../assets/icons/tomato.png"),
  },
  {
    name: "greens",
    image: require("../assets/icons/greens.png"),
  },
  {
    name: "pepper",
    image: require("../assets/icons/pepper.png"),
  },
];

const Card = () => {
  // Navigation Hooks
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route = useRoute<RouteProp<MainStackParamList, "Card">>();

  // Order Hooks
  const [orderQuantity, setOrderQuantity] = useState(1);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ height: "45%" }}>
        <TouchableOpacity onPress={() => (navigation.canGoBack() ? navigation.goBack() : navigation.navigate("Main"))} style={styles.backTouchableOpacity}>
          <LeftArrowSVG size={30} fill={"#F26404"} />
        </TouchableOpacity>
      </SafeAreaView>
      <Image source={route.params.item.backgroundImage} style={styles.dishImage} />
      <View style={styles.cardView}>
        <ScrollView style={{ flex: 1 }}>
          {/* Title */}
          <Text style={{ fontFamily: "DMSans_700Bold", color: "#fff", fontSize: 22 }}>{route.params.item.extendedTitle}</Text>

          {/* Rating, Calories, Duration */}
          <View style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: 20 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <StarSVG size={16} fill={"#F9CA24"} />
              <Text style={{ fontFamily: "DMSans_500Medium", fontSize: 14, color: "#fff", marginLeft: 4 }}>{route.params.item.rating}</Text>
              <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 13, color: "#D6D6D6", marginLeft: 4 }}>({route.params.item.ratingCount})</Text>
            </View>
            <Text style={{ fontFamily: "DMSans_500Medium", fontSize: 14, color: "#D6D6D6", marginLeft: 25 }}>{route.params.item.calories} calories</Text>
            <View style={styles.durationView}>
              <ClockSVG size={12} fill={"#fff"} />
              <Text style={{ fontFamily: "DMSans_500Medium", color: "#fff", marginLeft: 5 }}>{route.params.item.duration} min</Text>
            </View>
          </View>

          {/* Details */}
          <Text style={{ fontFamily: "DMSans_700Bold", fontSize: 18, color: "#fff", marginTop: 25 }}>Details</Text>
          <Text style={{ fontFamily: "DMSans_400Regular", fontSize: 14, color: "#D6D6D6", marginTop: 10 }}>{route.params.item.details}</Text>

          {/* Ingredients */}
          <View style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
            {route.params.item.ingredients.map((idx) => (
              <View key={idx} style={styles.ingredientsView}>
                <Image source={ingredients[idx].image} />
              </View>
            ))}
          </View>

          {/* Quantity & Order Button */}
          <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 30 }}>
            <View style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity
                onPress={() => (orderQuantity > 1 ? setOrderQuantity(orderQuantity - 1) : Alert.alert("Warning", "Quantity cannot be less than one."))}
                style={styles.quantityTouchableOpacity}
              >
                <Text style={{ fontSize: 18, color: "#B1DB5A", fontFamily: "DMSans_700Bold" }}>-</Text>
              </TouchableOpacity>
              <Text style={{ fontFamily: "DMSans_700Bold", fontSize: 24, color: "#fff", marginLeft: 14 }}>{orderQuantity}</Text>
              <TouchableOpacity onPress={() => setOrderQuantity(orderQuantity + 1)} style={{ ...styles.quantityTouchableOpacity, marginLeft: 14 }}>
                <Text style={{ fontSize: 18, color: "#B1DB5A", fontFamily: "DMSans_700Bold" }}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => Alert.alert("Successful", "Order received, it may take between 10-30 minutes arriving to you.")}
              style={{ paddingHorizontal: 24, paddingVertical: 16, backgroundColor: "#B1DB5A", borderRadius: 30 }}
            >
              <Text style={{ fontFamily: "DMSans_700Bold", fontSize: 18, color: "#202020" }}>Order Now ${Math.floor(route.params.item.price * orderQuantity)}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backTouchableOpacity: {
    backgroundColor: "#323232",
    opacity: 0.9,
    width: 55,
    height: 55,
    display: "flex",
    zIndex: 15,
    marginLeft: 30,
    borderRadius: 999,
    justifyContent: "center",
    alignItems: "center",
  },
  dishImage: { position: "absolute", height: "48%", width: "100%", resizeMode: "cover", zIndex: -1 },
  cardView: {
    height: "55%",
    backgroundColor: "#202020",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  durationView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 11,
    paddingVertical: 6,
    backgroundColor: "#FF8533",
    marginLeft: 25,
    borderRadius: 15,
  },
  ingredientsView: { height: 48, width: 48, borderRadius: 11, backgroundColor: "#2C2C2C", marginRight: 19, display: "flex", alignItems: "center", justifyContent: "center" },
  quantityTouchableOpacity: { height: 24, width: 24, backgroundColor: "#2C2C2C", display: "flex", borderRadius: 999, alignItems: "center", justifyContent: "center" },
});

export default Card;

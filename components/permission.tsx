import { useCameraPermissions } from "expo-camera";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const CameraPermission = () => {
  const [permission, requestPermission] = useCameraPermissions();
  if (!permission) return <View />;
  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-center pb-2 text-lg">
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          className="bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white font-bold">Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

export default CameraPermission;

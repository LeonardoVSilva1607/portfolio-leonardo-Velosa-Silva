import React, { useRef, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  Dimensions,
} from "react-native";

export interface DrawingPoint {
  x: number;
  y: number;
  color: string;
  size: number;
}

export interface MapMarker {
  id: string;
  x: number;
  y: number;
  label: string;
  color: string;
}

export interface CanvasMapProps {
  width?: number;
  height?: number;
  onDrawing?: (points: DrawingPoint[]) => void;
  onMarkerAdd?: (marker: MapMarker) => void;
  markers?: MapMarker[];
  drawings?: DrawingPoint[];
  isEditable?: boolean;
}

export function CanvasMap({
  width = 300,
  height = 400,
  onDrawing,
  onMarkerAdd,
  markers = [],
  drawings = [],
  isEditable = true,
}: CanvasMapProps) {
  const canvasRef = useRef<View>(null);
  const [currentColor, setCurrentColor] = useState("#FF0000");
  const [currentSize, setCurrentSize] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPoints, setCurrentPoints] = useState<DrawingPoint[]>([]);
  const [tool, setTool] = useState<"pen" | "marker" | "eraser">("pen");
  const [allDrawings, setAllDrawings] = useState<DrawingPoint[]>(drawings);

  const colors = ["#FF0000", "#000000", "#0000FF", "#00FF00", "#FFFF00"];
  const sizes = [1, 2, 4, 6, 8];

  const handleTouchStart = useCallback(
    (event: GestureResponderEvent) => {
      if (!isEditable) return;

      if (tool === "eraser") {
        handleClear();
        return;
      }

      setIsDrawing(true);
      setCurrentPoints([]);
    },
    [isEditable, tool]
  );

  const handleTouchMove = useCallback(
    (event: GestureResponderEvent) => {
      if (!isEditable || !isDrawing || tool === "eraser") return;

      const { locationX, locationY } = event.nativeEvent;

      const newPoint: DrawingPoint = {
        x: locationX,
        y: locationY,
        color: currentColor,
        size: currentSize,
      };

      setCurrentPoints((prev) => [...prev, newPoint]);
    },
    [isEditable, isDrawing, tool, currentColor, currentSize]
  );

  const handleTouchEnd = useCallback(() => {
    if (!isEditable) return;
    setIsDrawing(false);

    if (currentPoints.length > 0) {
      const newDrawings = [...allDrawings, ...currentPoints];
      setAllDrawings(newDrawings);
      onDrawing?.(newDrawings);
      setCurrentPoints([]);
    }
  }, [isEditable, currentPoints, allDrawings, onDrawing]);

  const handleClear = useCallback(() => {
    setCurrentPoints([]);
    setAllDrawings([]);
    onDrawing?.([]);
  }, [onDrawing]);

  const handleAddMarker = useCallback(() => {
    if (!isEditable) return;

    const marker: MapMarker = {
      id: `marker-${Date.now()}`,
      x: width / 2,
      y: height / 2,
      label: "Marcador",
      color: currentColor,
    };

    onMarkerAdd?.(marker);
  }, [isEditable, width, height, currentColor, onMarkerAdd]);

  const allPoints = [...allDrawings, ...currentPoints];

  return (
    <View className="gap-4">
      {/* Canvas */}
      <View
        ref={canvasRef}
        className="bg-surface border border-border rounded-lg overflow-hidden relative"
        style={{ width, height }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Desenhos */}
        {allPoints.map((point, idx) => (
          <View
            key={`draw-${idx}`}
            style={{
              position: "absolute",
              left: point.x - point.size / 2,
              top: point.y - point.size / 2,
              width: Math.max(point.size, 1),
              height: Math.max(point.size, 1),
              borderRadius: point.size / 2,
              backgroundColor: point.color,
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Marcadores */}
        {markers.map((marker) => (
          <View
            key={marker.id}
            style={{
              position: "absolute",
              left: marker.x - 15,
              top: marker.y - 15,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: marker.color,
              borderWidth: 2,
              borderColor: "white",
              justifyContent: "center",
              alignItems: "center",
              pointerEvents: "none",
            }}
          >
            <Text className="text-xs font-bold text-white text-center">
              {marker.label.charAt(0)}
            </Text>
          </View>
        ))}

        {/* Grid de fundo */}
        <View
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(0deg, #e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            pointerEvents: "none",
            opacity: 0.3,
          }}
        />
      </View>

      {/* Toolbar */}
      {isEditable && (
        <View className="gap-3">
          {/* Tool Selection */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg items-center ${
                tool === "pen" ? "bg-primary" : "bg-surface border border-border"
              }`}
              onPress={() => setTool("pen")}
            >
              <Text className={tool === "pen" ? "text-white font-semibold" : "text-foreground"}>
                ✏️ Lápis
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg items-center ${
                tool === "marker" ? "bg-primary" : "bg-surface border border-border"
              }`}
              onPress={() => setTool("marker")}
            >
              <Text
                className={tool === "marker" ? "text-white font-semibold" : "text-foreground"}
              >
                📍 Marcador
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className={`flex-1 p-3 rounded-lg items-center ${
                tool === "eraser" ? "bg-error" : "bg-surface border border-border"
              }`}
              onPress={() => setTool("eraser")}
            >
              <Text
                className={tool === "eraser" ? "text-white font-semibold" : "text-foreground"}
              >
                🗑️ Limpar
              </Text>
            </TouchableOpacity>
          </View>

          {/* Color Selection */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold text-sm">Cor</Text>
            <View className="flex-row gap-2">
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  className={`w-10 h-10 rounded-lg border-2 ${
                    currentColor === color ? "border-foreground" : "border-transparent"
                  }`}
                  style={{ backgroundColor: color }}
                  onPress={() => {
                    setCurrentColor(color);
                    setTool("pen");
                  }}
                />
              ))}
            </View>
          </View>

          {/* Size Selection */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold text-sm">Espessura</Text>
            <View className="flex-row gap-2">
              {sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  className={`flex-1 p-2 rounded-lg items-center border ${
                    currentSize === size
                      ? "bg-primary border-primary"
                      : "bg-surface border-border"
                  }`}
                  onPress={() => {
                    setCurrentSize(size);
                    setTool("pen");
                  }}
                >
                  <View
                    style={{
                      width: size * 2,
                      height: size * 2,
                      borderRadius: size,
                      backgroundColor: currentColor,
                    }}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-1 bg-primary p-3 rounded-lg items-center"
              onPress={handleAddMarker}
            >
              <Text className="text-white font-semibold">+ Marcador</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-error p-3 rounded-lg items-center"
              onPress={handleClear}
            >
              <Text className="text-white font-semibold">Limpar Tudo</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

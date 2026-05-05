import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { CanvasMap, DrawingPoint, MapMarker } from "@/components/canvas-map";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

// Mock data - em produção viriam da API
const MOCK_SESSION_MAP = {
  id: "map-1",
  name: "Taverna da Cidade",
  description: "Uma taverna aconchegante no coração da cidade",
  drawings: [
    { x: 50, y: 50, color: "#000000", size: 2 },
    { x: 60, y: 60, color: "#000000", size: 2 },
    { x: 70, y: 70, color: "#000000", size: 2 },
  ] as DrawingPoint[],
  markers: [
    {
      id: "marker-1",
      x: 100,
      y: 100,
      label: "Entrada",
      color: "#FF0000",
    },
    {
      id: "marker-2",
      x: 200,
      y: 150,
      label: "Bar",
      color: "#0000FF",
    },
  ] as MapMarker[],
};

export default function SessionMapViewerScreen() {
  const router = useRouter();
  const [map, setMap] = useState(MOCK_SESSION_MAP);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawings, setDrawings] = useState<DrawingPoint[]>(map.drawings);
  const [markers, setMarkers] = useState<MapMarker[]>(map.markers);

  const handleDrawing = (newDrawings: DrawingPoint[]) => {
    setDrawings(newDrawings);
    // Aqui você sincronizaria com WebSocket para outros participantes
    console.log("[SessionMapViewer] Drawing updated:", newDrawings.length, "points");
  };

  const handleMarkerAdd = (marker: MapMarker) => {
    setMarkers((prev) => [...prev, marker]);
    // Aqui você sincronizaria com WebSocket para outros participantes
    console.log("[SessionMapViewer] Marker added:", marker);
  };

  const handleToggleDrawing = () => {
    setIsDrawing(!isDrawing);
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-4">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-2xl font-bold text-foreground">{map.name}</Text>
            <Text className="text-muted">{map.description}</Text>
          </View>

          {/* Status Bar */}
          <View className="flex-row gap-2 bg-primary/10 rounded-lg p-3 border border-primary/20">
            <View className="flex-1">
              <Text className="text-muted text-xs">Participantes Desenhando</Text>
              <Text className="text-primary font-bold text-lg">3 / 4</Text>
            </View>
            <View className="flex-1">
              <Text className="text-muted text-xs">Marcadores</Text>
              <Text className="text-primary font-bold text-lg">{markers.length}</Text>
            </View>
            <View className="flex-1">
              <Text className="text-muted text-xs">Pontos de Desenho</Text>
              <Text className="text-primary font-bold text-lg">{drawings.length}</Text>
            </View>
          </View>

          {/* Canvas */}
          <View className="gap-2">
            <View className="flex-row items-center justify-between">
              <Text className="text-foreground font-semibold">Mapa da Sessão</Text>
              <View
                className={`px-3 py-1 rounded-full ${
                  isDrawing ? "bg-primary" : "bg-surface border border-border"
                }`}
              >
                <Text className={isDrawing ? "text-white text-xs font-semibold" : "text-muted text-xs"}>
                  {isDrawing ? "Modo Desenho Ativo" : "Modo Visualização"}
                </Text>
              </View>
            </View>

            <CanvasMap
              width={300}
              height={400}
              drawings={drawings}
              markers={markers}
              isEditable={isDrawing}
              onDrawing={handleDrawing}
              onMarkerAdd={handleMarkerAdd}
            />
          </View>

          {/* Participants List */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold">Participantes</Text>
            <View className="gap-2">
              {[
                { name: "Você", color: "#FF0000", isDrawing: isDrawing },
                { name: "João", color: "#0000FF", isDrawing: true },
                { name: "Maria", color: "#00FF00", isDrawing: false },
                { name: "Pedro", color: "#FFFF00", isDrawing: true },
              ].map((participant, idx) => (
                <View
                  key={idx}
                  className="bg-surface rounded-lg p-3 border border-border flex-row items-center gap-3"
                >
                  <View
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      backgroundColor: participant.color,
                    }}
                  />
                  <Text className="text-foreground font-semibold flex-1">{participant.name}</Text>
                  {participant.isDrawing && (
                    <View className="bg-primary/20 px-2 py-1 rounded">
                      <Text className="text-primary text-xs font-semibold">✏️ Desenhando</Text>
                    </View>
                  )}
                </View>
              ))}
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              className={`flex-1 p-4 rounded-lg items-center ${
                isDrawing ? "bg-primary" : "bg-surface border border-border"
              }`}
              onPress={handleToggleDrawing}
            >
              <Text className={isDrawing ? "text-white font-semibold" : "text-foreground font-semibold"}>
                {isDrawing ? "✓ Modo Desenho Ativo" : "Ativar Modo Desenho"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-surface border border-border p-4 rounded-lg items-center"
              onPress={() => router.back()}
            >
              <Text className="text-foreground font-semibold">Voltar</Text>
            </TouchableOpacity>
          </View>

          {/* Info Card */}
          <View className="bg-primary/10 rounded-lg p-4 border border-primary/20 gap-2">
            <Text className="text-foreground font-semibold">💡 Dica</Text>
            <Text className="text-muted text-sm">
              Ative o modo desenho para adicionar marcadores e desenhos. Todos os participantes verão suas
              alterações em tempo real!
            </Text>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

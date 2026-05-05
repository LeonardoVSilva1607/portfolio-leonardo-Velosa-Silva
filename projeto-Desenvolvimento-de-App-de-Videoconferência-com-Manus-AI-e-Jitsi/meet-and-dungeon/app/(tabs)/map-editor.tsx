import { ScrollView, Text, View, TouchableOpacity, TextInput, Alert } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { CanvasMap, DrawingPoint, MapMarker } from "@/components/canvas-map";
import { useState } from "react";
import { useRouter } from "expo-router";

export default function MapEditorScreen() {
  const router = useRouter();
  const [mapName, setMapName] = useState("");
  const [mapDescription, setMapDescription] = useState("");
  const [drawings, setDrawings] = useState<DrawingPoint[]>([]);
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveMap = async () => {
    if (!mapName.trim()) {
      Alert.alert("Erro", "Digite um nome para o mapa");
      return;
    }

    try {
      setIsSaving(true);

      // Aqui você integraria com a API para salvar o mapa
      const mapData = {
        name: mapName,
        description: mapDescription,
        drawings,
        markers,
        createdAt: new Date().toISOString(),
      };

      console.log("[MapEditor] Saving map:", mapData);

      Alert.alert("Sucesso", "Mapa salvo com sucesso!", [
        {
          text: "OK",
          onPress: () => {
            router.back();
          },
        },
      ]);
    } catch (error) {
      console.error("[MapEditor] Error saving map:", error);
      Alert.alert("Erro", "Falha ao salvar o mapa");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDrawing = (newDrawings: DrawingPoint[]) => {
    setDrawings(newDrawings);
  };

  const handleMarkerAdd = (marker: MapMarker) => {
    setMarkers((prev) => [...prev, marker]);
  };

  return (
    <ScreenContainer className="p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
        <View className="gap-6">
          {/* Header */}
          <View className="gap-2">
            <Text className="text-3xl font-bold text-foreground">Editor de Mapas</Text>
            <Text className="text-muted">Crie e customize seus mapas virtuais</Text>
          </View>

          {/* Map Info */}
          <View className="gap-4 bg-surface rounded-lg p-4 border border-border">
            <View className="gap-2">
              <Text className="text-foreground font-semibold">Nome do Mapa *</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="Ex: Taverna da Cidade"
                placeholderTextColor="#808080"
                value={mapName}
                onChangeText={setMapName}
              />
            </View>

            <View className="gap-2">
              <Text className="text-foreground font-semibold">Descrição</Text>
              <TextInput
                className="bg-background border border-border rounded-lg p-3 text-foreground"
                placeholder="Descreva o mapa..."
                placeholderTextColor="#808080"
                value={mapDescription}
                onChangeText={setMapDescription}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

          {/* Canvas */}
          <View className="gap-2">
            <Text className="text-foreground font-semibold">Área de Desenho</Text>
            <CanvasMap
              width={300}
              height={400}
              drawings={drawings}
              markers={markers}
              isEditable={true}
              onDrawing={handleDrawing}
              onMarkerAdd={handleMarkerAdd}
            />
          </View>

          {/* Stats */}
          <View className="flex-row gap-4 bg-primary/10 rounded-lg p-4 border border-primary/20">
            <View className="flex-1 items-center">
              <Text className="text-primary font-bold text-lg">{drawings.length}</Text>
              <Text className="text-muted text-xs">Pontos de Desenho</Text>
            </View>
            <View className="flex-1 items-center">
              <Text className="text-primary font-bold text-lg">{markers.length}</Text>
              <Text className="text-muted text-xs">Marcadores</Text>
            </View>
          </View>

          {/* Markers List */}
          {markers.length > 0 && (
            <View className="gap-2">
              <Text className="text-foreground font-semibold">Marcadores Adicionados</Text>
              <View className="gap-2">
                {markers.map((marker) => (
                  <View
                    key={marker.id}
                    className="bg-surface rounded-lg p-3 border border-border flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center gap-3 flex-1">
                      <View
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: 8,
                          backgroundColor: marker.color,
                        }}
                      />
                      <View className="flex-1">
                        <Text className="text-foreground font-semibold">{marker.label}</Text>
                        <Text className="text-muted text-xs">
                          Pos: ({Math.round(marker.x)}, {Math.round(marker.y)})
                        </Text>
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setMarkers((prev) => prev.filter((m) => m.id !== marker.id));
                      }}
                    >
                      <Text className="text-error font-semibold">✕</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Action Buttons */}
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="flex-1 bg-primary p-4 rounded-lg items-center"
              onPress={handleSaveMap}
              disabled={isSaving}
            >
              <Text className="text-white font-semibold text-lg">
                {isSaving ? "Salvando..." : "Salvar Mapa"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-surface border border-border p-4 rounded-lg items-center"
              onPress={() => router.back()}
              disabled={isSaving}
            >
              <Text className="text-foreground font-semibold text-lg">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

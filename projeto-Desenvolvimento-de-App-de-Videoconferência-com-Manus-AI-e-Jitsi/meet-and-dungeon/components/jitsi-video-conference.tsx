import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ActivityIndicator, Alert, Linking, Platform } from "react-native";
import { useAuth } from "@/hooks/use-auth";
import { ScreenContainer } from "./screen-container";

interface JitsiVideoConferenceProps {
  roomName: string;
  sessionName: string;
  onEndCall?: () => void;
  serverUrl?: string;
}

/**
 * Componente de Videoconferência com Jitsi Meet
 * Suporta câmera, microfone e compartilhamento de tela
 * 
 * Funciona abrindo o Jitsi Meet em um navegador/webview
 */
export function JitsiVideoConference({
  roomName,
  sessionName,
  onEndCall,
  serverUrl = "https://meet.jit.si",
}: JitsiVideoConferenceProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // Construir URL do Jitsi Meet com parâmetros
  const buildJitsiUrl = () => {
    const params = new URLSearchParams({
      userInfo: JSON.stringify({
        displayName: user?.name || "Usuário",
        email: user?.email || "",
      }),
      config: JSON.stringify({
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        disableAddingBackgroundImages: true,
        disableCallIntegration: true,
        disableInviteFunctions: false,
        disableModeratorIndicator: false,
        disableProfile: false,
        disableRemoteControl: true,
        disableScreenSharingButton: false,
        disableTileView: false,
        disableToggleCameraButton: false,
        disableToggleMicButton: false,
      }),
    });

    return `${serverUrl}/${roomName}?${params.toString()}`;
  };

  const handleJoinConference = async () => {
    try {
      setIsLoading(true);
      const url = buildJitsiUrl();
      
      console.log("[Jitsi] Joining conference:", {
        room: roomName,
        url: url,
        user: user?.name,
      });

      // Abrir Jitsi Meet em navegador/webview
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Erro", "Não foi possível abrir a videoconferência");
      }
    } catch (error) {
      console.error("[Jitsi] Error joining conference:", error);
      Alert.alert("Erro", "Falha ao conectar à videoconferência");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    console.log("[Jitsi] Camera toggled:", !isCameraOn);
  };

  const toggleMicrophone = () => {
    setIsMicOn(!isMicOn);
    console.log("[Jitsi] Microphone toggled:", !isMicOn);
  };

  const toggleScreenSharing = () => {
    setIsScreenSharing(!isScreenSharing);
    console.log("[Jitsi] Screen sharing toggled:", !isScreenSharing);
    Alert.alert(
      "Compartilhamento de Tela",
      isScreenSharing
        ? "Compartilhamento de tela desativado"
        : "Compartilhamento de tela ativado (use os controles do Jitsi Meet)"
    );
  };

  const handleEndCall = () => {
    Alert.alert(
      "Encerrar Chamada",
      "Tem certeza que deseja encerrar a videoconferência?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Encerrar",
          onPress: () => {
            if (onEndCall) {
              onEndCall();
            }
          },
          style: "destructive",
        },
      ]
    );
  };

  return (
    <ScreenContainer className="gap-4">
      <View className="gap-4">
        {/* Header */}
        <View className="gap-2">
          <Text className="text-2xl font-bold text-foreground">Videoconferência</Text>
          <Text className="text-muted">Sessão: {sessionName}</Text>
          <Text className="text-muted text-sm">Sala: {roomName}</Text>
        </View>

        {/* Info Card */}
        <View className="bg-surface rounded-lg p-4 border border-border gap-2">
          <Text className="text-foreground font-semibold">Informações da Sessão</Text>
          <Text className="text-muted text-sm">
            Você está prestes a entrar em uma videoconferência com Jitsi Meet. Clique em "Entrar na Conferência" para começar.
          </Text>
          <Text className="text-muted text-sm mt-2">
            <Text className="font-semibold">Seu nome:</Text> {user?.name || "Usuário"}
          </Text>
          <Text className="text-muted text-sm">
            <Text className="font-semibold">Seu email:</Text> {user?.email || "não informado"}
          </Text>
        </View>

        {/* Controls Preview */}
        <View className="bg-surface rounded-lg p-4 border border-border gap-3">
          <Text className="text-foreground font-semibold">Controles Disponíveis</Text>

          {/* Camera Control */}
          <View className="flex-row items-center justify-between">
            <Text className="text-muted">Câmera</Text>
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${isCameraOn ? "bg-primary" : "bg-error"}`}
              onPress={toggleCamera}
            >
              <Text className="text-white font-semibold text-sm">
                {isCameraOn ? "Ativada" : "Desativada"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Microphone Control */}
          <View className="flex-row items-center justify-between">
            <Text className="text-muted">Microfone</Text>
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${isMicOn ? "bg-primary" : "bg-error"}`}
              onPress={toggleMicrophone}
            >
              <Text className="text-white font-semibold text-sm">
                {isMicOn ? "Ativado" : "Desativado"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Screen Sharing Control */}
          <View className="flex-row items-center justify-between">
            <Text className="text-muted">Compartilhar Tela</Text>
            <TouchableOpacity
              className={`px-4 py-2 rounded-lg ${isScreenSharing ? "bg-primary" : "bg-surface border border-border"}`}
              onPress={toggleScreenSharing}
            >
              <Text className={`font-semibold text-sm ${isScreenSharing ? "text-white" : "text-foreground"}`}>
                {isScreenSharing ? "Ativado" : "Desativado"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Join Conference Button */}
        <TouchableOpacity
          className="bg-primary rounded-lg p-4 items-center"
          onPress={handleJoinConference}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-semibold text-lg">Entrar na Conferência</Text>
          )}
        </TouchableOpacity>

        {/* End Call Button */}
        <TouchableOpacity
          className="bg-error rounded-lg p-4 items-center"
          onPress={handleEndCall}
        >
          <Text className="text-white font-semibold text-lg">Encerrar Chamada</Text>
        </TouchableOpacity>

        {/* Features List */}
        <View className="bg-surface rounded-lg p-4 border border-border gap-2">
          <Text className="text-foreground font-semibold">Recursos Disponíveis</Text>
          <Text className="text-muted text-sm">✓ Videoconferência em tempo real</Text>
          <Text className="text-muted text-sm">✓ Controle de câmera e microfone</Text>
          <Text className="text-muted text-sm">✓ Compartilhamento de tela</Text>
          <Text className="text-muted text-sm">✓ Chat integrado</Text>
          <Text className="text-muted text-sm">✓ Gravação de sessão (opcional)</Text>
          <Text className="text-muted text-sm">✓ Suporte a múltiplos participantes</Text>
        </View>

        {/* Note */}
        <View className="bg-warning/10 rounded-lg p-4 border border-warning gap-2">
          <Text className="text-warning font-semibold">Nota Importante</Text>
          <Text className="text-muted text-sm">
            A videoconferência será aberta em uma nova janela/aba. Você pode retornar a este aplicativo a qualquer momento.
          </Text>
        </View>
      </View>
    </ScreenContainer>
  );
}

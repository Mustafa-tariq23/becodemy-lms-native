import { Alert, ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useCallback, useMemo, useState } from "react";
import { useTheme } from "@/context/theme.context";
import * as WebBrowser from "expo-web-browser";
import {
  fontSizes,
  SCREEN_WIDTH,
  windowHeight,
  windowWidth,
} from "@/themes/app.constant";

// imports for video player

import YoutubePlayer from "react-native-youtube-iframe";

// Helper to extract a YouTube video ID from multiple possible URL formats
function extractYoutubeId(url: string): string | null {
  if (!url) return null;
  // Short form youtu.be/<id>
  const shortMatch = url.match(/youtu.be\/([a-zA-Z0-9_-]{6,})/);
  if (shortMatch) return shortMatch[1];
  // watch?v=<id>
  const watchMatch = url.match(/[?&]v=([a-zA-Z0-9_-]{6,})/);
  if (watchMatch) return watchMatch[1];
  // embed/<id>
  const embedMatch = url.match(/embed\/([a-zA-Z0-9_-]{6,})/);
  if (embedMatch) return embedMatch[1];
  return null;
}

export default function SourceCodeCard({
  item,
}: {
  item: {
    url: string;
    thumbnail: string;
    title: string;
  };
}) {
  const { theme } = useTheme();

  const handlePress = async () => {
    await WebBrowser.openBrowserAsync(item.url);
  };
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // No custom controls – rely on YouTube's built-in UI.

  const videoId = useMemo(() => extractYoutubeId(item.url), [item.url]);

  // youtube iframe callbacks
  const onStateChange = useCallback((state: any) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("Completed", "Video has finished playing");
    }
  }, []);
  const togglePlaying = useCallback(() => {
    if (!ready) return; // don't toggle before ready
    setPlaying(prev => !prev);
  }, [ready]);

  const onReady = useCallback(() => {
    setReady(true);
  }, []);

  const onError = useCallback((e: any) => {
    setError("Unable to load video");
  }, []);

  // Allow only core youtube/internal domains to prevent external navigation (still prevents app handoff)
  const onShouldStartLoadWithRequest = useCallback((request: any) => {
    try {
      const u = new URL(request.url);
      return ["www.youtube.com","m.youtube.com","youtube.com","i.ytimg.com","s.ytimg.com"].includes(u.host);
    } catch {
      return false;
    }
  }, []);

  // NOTE: Using only native YouTube controls (play/pause, seek, fullscreen, settings). Quality & speed handled by YouTube UI.

  return (
    <View style={[styles.wrapper, { backgroundColor: theme.dark ? '#1f2327' : '#f1f5f9' }]}>        
      <View style={styles.playerContainer}>
        {videoId && !error && (
          <YoutubePlayer
            height={styles.playerSize.height}
            width={styles.playerSize.width}
            play={playing}
            videoId={videoId}
            onChangeState={onStateChange}
            onReady={onReady}
            onError={onError}
            webViewProps={{ onShouldStartLoadWithRequest }}
            initialPlayerParams={{
              controls: true,
              modestbranding: true,
              rel: false,
              playsinline: true,
            }}
          />
        )}
        {(!ready || error) && (
          <View style={[styles.loaderOverlay, { backgroundColor: theme.dark ? '#111418' : '#e2e8f0' }]}>            
            {!error ? (
              <ActivityIndicator color={theme.dark ? '#fff' : '#222'} />
            ) : (
              <Text style={{ color: theme.dark ? '#fff' : '#dc2626' }}>{error}</Text>
            )}
          </View>
        )}
      </View>
      <View style={styles.meta}>
        <Text style={[styles.title, { color: theme.dark ? '#fff' : '#1e293b' }]} numberOfLines={2}>{item.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: windowWidth(10),
    marginHorizontal: windowWidth(16),
    marginVertical: windowHeight(10),
    overflow: 'hidden',
  },
  playerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerSize: {
    width: SCREEN_WIDTH - 52,
    height: (SCREEN_WIDTH - 52) * 0.5625,
  },
  loaderOverlay: {
    position:'absolute',
    top:0, left:0, right:0, bottom:0,
    alignItems:'center', justifyContent:'center'
  },
  // Removed custom overlay controls & rate buttons
  meta: { paddingHorizontal: windowWidth(18), paddingVertical: windowHeight(12) },
  title: { fontFamily:'Poppins_500Medium', fontSize: fontSizes.FONT16 },
  // Fullscreen modal & related styles removed
  card: {
    borderRadius: windowWidth(10),
    shadowOpacity: 0.1,
    shadowColor: "#40E0D0",
    shadowRadius: 5,
  },
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },

});

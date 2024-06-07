declare global {
    interface Window {
      onYouTubeIframeAPIReady: () => void;
      YT: any; // You can provide a more specific type if available
    }
  }
  
  export {};
  